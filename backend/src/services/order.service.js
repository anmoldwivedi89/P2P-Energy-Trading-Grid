const Listing = require('../models/Listing');
const Order = require('../models/Order');
const User = require('../models/User');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors');

class OrderService {
  /**
   * Concurrency-safe atomic order creation
   * @param {Object} buyer User object
   * @param {Object} orderData { listingId, units / amountKwh }
   */
  async createOrder(buyer, orderData) {
    const listingId = orderData.listingId || orderData.listing;
    const requestedAmount = Number(orderData.amountKwh || orderData.units);

    if (!listingId) {
      throw new BadRequestError('Listing identifier is required');
    }

    if (!requestedAmount || requestedAmount <= 0) {
      throw new BadRequestError('Requested energy amount must be greater than 0 kWh');
    }

    // Step 1: Pre-fetch listing for basic checks
    const targetListing = await Listing.findById(listingId);
    if (!targetListing) {
      throw new NotFoundError('Energy listing not found');
    }

    if (targetListing.status !== 'Active') {
      throw new BadRequestError(`Listing is not active (current status: ${targetListing.status})`);
    }

    if (targetListing.seller.toString() === buyer._id.toString()) {
      throw new BadRequestError('Prosumers cannot purchase energy from their own listings');
    }

    if (targetListing.amount < requestedAmount) {
      throw new BadRequestError(
        `Insufficient energy available. Requested ${requestedAmount} kWh, but only ${targetListing.amount} kWh remains.`
      );
    }

    // Step 2: Atomic decrement to strictly prevent race-condition overselling
    const updatedListing = await Listing.findOneAndUpdate(
      {
        _id: listingId,
        status: 'Active',
        amount: { $gte: requestedAmount },
      },
      {
        $inc: { amount: -requestedAmount },
      },
      {
        new: true,
      }
    );

    if (!updatedListing) {
      throw new BadRequestError(
        'Could not complete purchase. The listing was either modified by another order or has insufficient units.'
      );
    }

    // Step 3: If fully depleted, mark as Sold
    if (updatedListing.amount <= 0) {
      updatedListing.status = 'Sold';
      await updatedListing.save();
    }

    // Step 4: Calculate financial settlement
    const subtotal = Math.round(requestedAmount * updatedListing.pricePerKwh * 100) / 100;
    const platformFee = Math.round(subtotal * 0.02 * 100) / 100; // 2% smart grid transmission fee
    const totalPrice = Math.round((subtotal + platformFee) * 100) / 100;
    const carbonOffsetKg = Math.round(requestedAmount * 0.536 * 100) / 100; // 0.536 kg CO2 offset per clean kWh

    // Step 5: Persist order
    let order;
    try {
      order = await Order.create({
        listing: updatedListing._id,
        buyer: buyer._id,
        seller: updatedListing.seller,
        buyerName: buyer.name,
        sellerName: updatedListing.sellerName,
        energyType: updatedListing.energyType,
        amountKwh: requestedAmount,
        pricePerKwh: updatedListing.pricePerKwh,
        subtotal,
        platformFee,
        totalPrice,
        carbonOffsetKg,
        status: 'Completed',
        gridNodeRoute: `${updatedListing.location} -> ${buyer.location || 'Local Grid Node'}`,
      });

      // Step 6: Update user lifetime metrics asynchronously
      await Promise.all([
        User.findByIdAndUpdate(updatedListing.seller, {
          $inc: {
            totalEnergySoldKwh: requestedAmount,
            totalEarnings: subtotal,
          },
        }),
        User.findByIdAndUpdate(buyer._id, {
          $inc: {
            carbonOffsetKg: carbonOffsetKg,
          },
        }),
      ]);

      return order;
    } catch (orderError) {
      // Rollback the atomic decrement if order record creation fails
      console.error('[Order Rollback] Failed to create order, reverting listing supply:', orderError);
      await Listing.findByIdAndUpdate(listingId, {
        $inc: { amount: requestedAmount },
        $set: { status: 'Active' },
      });
      throw orderError;
    }
  }

  /**
   * Cancel an order and restore listing quantity
   */
  async cancelOrder(user, orderId) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Only buyer, seller or admin can cancel
    const isBuyer = order.buyer.toString() === user._id.toString();
    const isSeller = order.seller.toString() === user._id.toString();
    const isAdmin = user.role === 'admin';

    if (!isBuyer && !isSeller && !isAdmin) {
      throw new ForbiddenError('Not authorized to modify this order');
    }

    if (order.status === 'Cancelled') {
      throw new BadRequestError('Order is already cancelled');
    }

    order.status = 'Cancelled';
    await order.save();

    // Replenish energy supply to the listing
    await Listing.findByIdAndUpdate(order.listing, {
      $inc: { amount: order.amountKwh },
      $set: { status: 'Active' },
    });

    return order;
  }
}

module.exports = new OrderService();
