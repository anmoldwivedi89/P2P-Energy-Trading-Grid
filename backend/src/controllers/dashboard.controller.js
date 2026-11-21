const Order = require('../models/Order');
const Listing = require('../models/Listing');
const User = require('../models/User');
const { successResponse } = require('../utils/response');

// Buyer Dashboard ke liye telemetry aur metrics fetch karne ka function
const getBuyerDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Buyer ke saare orders fetch kar rahe hain
    const orders = await Order.find({ buyer: userId })
      .sort({ createdAt: -1 })
      .populate('seller', 'name email location')
      .populate('listing', 'energyType location');

    // Completed orders ke basis par energy consumption calculate kar rahe hain
    const totalEnergyConsumed = orders
      .filter((o) => o.status === 'Completed')
      .reduce((sum, o) => sum + (Number(o.amountKwh) || Number(o.amount) || 0), 0);

    const totalEnergyPurchased = orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (Number(o.amountKwh) || Number(o.amount) || 0), 0);

    // Clean energy purchase se save hua total carbon offset (kg CO2)
    const carbonSaved = orders.reduce(
      (sum, o) => sum + (Number(o.carbonOffsetKg) || (Number(o.amountKwh) || 0) * 0.82),
      0
    );

    const activeOrders = orders.filter((o) => o.status === 'Pending').length;

    const totalSpent = orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);

    const payload = {
      totalEnergyConsumed: Number(totalEnergyConsumed.toFixed(2)),
      totalEnergyPurchased: Number(totalEnergyPurchased.toFixed(2)),
      carbonSaved: Number(carbonSaved.toFixed(2)),
      activeOrders,
      totalSpent: Number(totalSpent.toFixed(2)),
      orders: orders.slice(0, 10),
    };

    return successResponse(res, 'Buyer dashboard telemetry retrieved', payload);
  } catch (error) {
    next(error);
  }
};

// Seller Dashboard ke liye prosumer telemetry fetch karne ka function
const getSellerDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [orders, listings, user] = await Promise.all([
      Order.find({ seller: userId })
        .sort({ createdAt: -1 })
        .populate('buyer', 'name email location')
        .populate('listing', 'energyType location'),
      Listing.find({ seller: userId }).sort({ createdAt: -1 }),
      User.findById(userId),
    ]);

    // Seller dwara bechi gayi total completed energy
    const totalEnergySold = orders
      .filter((o) => o.status === 'Completed')
      .reduce((sum, o) => sum + (Number(o.amountKwh) || Number(o.amount) || 0), 0);

    // Seller ka total settled revenue (in ₹ INR)
    const totalRevenueNumber = orders
      .filter((o) => o.status === 'Completed')
      .reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);

    const activeListings = listings.filter((l) => l.status === 'Active').length;

    const totalAvailableCapacity = listings
      .filter((l) => l.status === 'Active')
      .reduce((sum, l) => sum + (Number(l.amount) || 0), 0);

    // Solar capacity ke according estimated baseline generation
    const baseGeneration = user?.solarCapacityKw ? user.solarCapacityKw * 5.2 : 120.0;
    const totalEnergyGenerated = Math.max(
      baseGeneration,
      totalEnergySold + totalAvailableCapacity
    );

    const payload = {
      totalEnergyGenerated: Number(totalEnergyGenerated.toFixed(2)),
      totalEnergySold: Number(totalEnergySold.toFixed(2)),
      totalRevenue: `₹${totalRevenueNumber.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      totalRevenueNumber: Number(totalRevenueNumber.toFixed(2)),
      activeListings,
      totalAvailableCapacity: Number(totalAvailableCapacity.toFixed(2)),
      orders: orders.slice(0, 10),
      listings: listings.slice(0, 10),
    };

    return successResponse(res, 'Seller dashboard telemetry retrieved', payload);
  } catch (error) {
    next(error);
  }
};

// Admin Dashboard ke liye overall grid network statistics aggregate karna
const getAdminDashboard = async (req, res, next) => {
  try {
    const [
      totalUsers,
      activeSellers,
      activeBuyers,
      orders,
      listings,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'seller' }),
      User.countDocuments({ role: 'buyer' }),
      Order.find()
        .sort({ createdAt: -1 })
        .populate('buyer', 'name email')
        .populate('seller', 'name email'),
      Listing.find().sort({ createdAt: -1 }),
    ]);

    // Grid par total trade hui clean energy (kWh)
    const totalEnergyTraded = orders
      .filter((o) => o.status === 'Completed')
      .reduce((sum, o) => sum + (Number(o.amountKwh) || Number(o.amount) || 0), 0);

    // Consolidated settled transaction revenue
    const totalSettledRevenue = orders
      .filter((o) => o.status === 'Completed')
      .reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);

    const payload = {
      totalUsers,
      activeSellers,
      activeBuyers,
      totalEnergyTraded: Number(totalEnergyTraded.toFixed(2)),
      totalSettledRevenue: Number(totalSettledRevenue.toFixed(2)),
      totalListings: listings.length,
      transactions: orders.slice(0, 15),
      listings: listings.slice(0, 10),
    };

    return successResponse(res, 'Admin dashboard telemetry retrieved', payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBuyerDashboard,
  getSellerDashboard,
  getAdminDashboard,
};
