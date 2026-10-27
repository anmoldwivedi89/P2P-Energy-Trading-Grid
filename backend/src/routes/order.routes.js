const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { validateBody } = require('../middleware/validate.middleware');

// All order routes require authentication
router.use(authenticate);

// Buyer's order history
router.get('/buyer/my-orders', orderController.getBuyerOrders);

// Seller's received order history
router.get('/seller/my-orders', authorize('seller', 'admin'), orderController.getSellerOrders);

// Create new P2P energy order
router.post('/', validateBody(['listingId']), orderController.createOrder);

// Specific order details
router.get('/:id', orderController.getOrderById);

// Update order status or cancel
router.patch('/:id/status', validateBody(['status']), orderController.updateOrderStatus);

module.exports = router;
