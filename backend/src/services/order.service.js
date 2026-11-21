const Listing = require('../models/Listing');
const Order = require('../models/Order');
const User = require('../models/User');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors');

class OrderService {
  /**
   * Concurrency-safe atomic order creation.
   * Race conditions se bachne ke liye MongoDB findOneAndUpdate use karte hain.
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

    // Step 1: Basic validation ke liye listing pehle fetch karte hain
    const targetListing = await Listing.findById(listingId);
    if (!targetListing) {
      throw new NotFoundError('Energy listing not found');
    }

    if (targetListing.status !== 'Active') {
      throw new BadRequestError(`Listing is not active (current status: ${targetListing.status})`);
    }

    // Prosumer khud ki listing se energy nahi khareed sakta
    if (targetListing.seller.toString() === buyer._id.toString()) {
      throw new BadRequestError('Prosumers cannot purchase energy from their own listings');
    }

    // Check karte hain ki requested units listing supply ke andar hain ya nahi
    if (targetListing.amount < requestedAmount) {
      throw new BadRequestError(
        `Insufficient energy available. Requested ${requestedAmount} kWh, but only ${targetListing.amount} kWh remains.`
      );
    }

    // Step 2: Atomic decrement karte hain taaki do buyers ek hi time pe oversell na kar sakein
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

    // Step 3: Agar pura stock khatam ho gaya toh status 'Sold' mark kar dete hain
    if (updatedListing.amount <= 0) {
      updatedListing.status = 'Sold';
      await updatedListing.save();
    }

    // Step 4: Financial settlement aur smart grid platform fee calculate karte hain
    const subtotal = Math.round(requestedAmount * updatedListing.pricePerKwh * 100) / 100;
    const platformFee = Math.round(subtotal * 0.02 * 100) / 100; // 2% platform fee
    const totalPrice = Math.round((subtotal + platformFee) * 100) / 100;
    const carbonOffsetKg = Math.round(requestedAmount * 0.536 * 100) / 100; // 0.536 kg CO2 offset per clean kWh

    // Step 5: Order document create karte hain
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

      // Step 6: Seller ki total earnings aur buyer ka carbon offset async update karte hain
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
      // Agar order create karne mein error aaye toh listing ka stock wapas rollback kar dete hain
      console.error('[Order Rollback] Order create nahi ho saka, supply revert kar rahe hain:', orderError);
      await Listing.findByIdAndUpdate(listingId, {
        $inc: { amount: requestedAmount },
        $set: { status: 'Active' },
      });
      throw orderError;
    }
  }

  /**
   * Cancel an order and restore listing quantity.
   * Order cancel hone par energy stock wapas listing mein replenish ho jata hai.
   */
  async cancelOrder(user, orderId) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Sirf buyer, seller ya admin hi order modify/cancel kar sakte hain
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

    // Listing mein cancelled units wapas add kar rahe hain
    await Listing.findByIdAndUpdate(order.listing, {
      $inc: { amount: order.amountKwh },
      $set: { status: 'Active' },
    });

    return order;
  }
}

module.exports = new OrderService();
