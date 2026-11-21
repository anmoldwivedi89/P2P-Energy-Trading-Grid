const Order = require('../models/Order');
const orderService = require('../services/order.service');
const { NotFoundError, ForbiddenError } = require('../utils/errors');
const { successResponse, createdResponse } = require('../utils/response');

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.user, req.body);
    return createdResponse(res, 'P2P energy order placed successfully', order);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('buyer', 'name email location')
      .populate('seller', 'name email location')
      .populate('listing');

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    const isBuyer = order.buyer._id.toString() === req.user._id.toString();
    const isSeller = order.seller._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isBuyer && !isSeller && !isAdmin) {
      throw new ForbiddenError('Not authorized to view this order');
    }

    return successResponse(res, 'Order details retrieved', order);
  } catch (error) {
    next(error);
  }
};

const getBuyerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .sort({ createdAt: -1 })
      .populate('seller', 'name email')
      .populate('listing', 'energyType location');

    return successResponse(res, 'Buyer orders fetched successfully', orders);
  } catch (error) {
    next(error);
  }
};

const getSellerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ seller: req.user._id })
      .sort({ createdAt: -1 })
      .populate('buyer', 'name email')
      .populate('listing', 'energyType location');

    return successResponse(res, 'Seller orders fetched successfully', orders);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status === 'Cancelled') {
      const cancelledOrder = await orderService.cancelOrder(req.user, id);
      return successResponse(res, 'Order cancelled and energy refunded', cancelledOrder);
    }

    const order = await Order.findById(id);
    if (!order) {
      throw new NotFoundError('Order not found');
    }

    const isSeller = order.seller.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isSeller && !isAdmin) {
      throw new ForbiddenError('Only the seller or an administrator can update the dispatch status');
    }

    order.status = status;
    await order.save();

    return successResponse(res, `Order status updated to ${status}`, order);
  } catch (error) {
    next(error);
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Order.find()
      .sort({ createdAt: -1 })
      .populate('buyer', 'name email')
      .populate('seller', 'name email');

    return successResponse(res, 'All grid transactions retrieved', transactions);
  } catch (error) {
    next(error);
  }
};

const getUserTransactions = async (req, res, next) => {
  try {
    const transactions = await Order.find({
      $or: [{ buyer: req.user._id }, { seller: req.user._id }],
    }).sort({ createdAt: -1 });

    return successResponse(res, 'User transaction history retrieved', transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getBuyerOrders,
  getSellerOrders,
  updateOrderStatus,
  getAllTransactions,
  getUserTransactions,
};
