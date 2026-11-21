const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { validateBody } = require('../middleware/validate.middleware');

// Sabhi order endpoints par authentication mandatory hai
router.use(authenticate);

// Buyer ke dwara place kiye gaye orders ki history
router.get('/buyer/my-orders', orderController.getBuyerOrders);

// Seller ko receive hue energy dispatch orders
router.get('/seller/my-orders', authorize('seller', 'admin'), orderController.getSellerOrders);

// Naya P2P energy purchase order create karna
router.post('/', validateBody(['listingId']), orderController.createOrder);

// Order ID ke through details fetch karna
router.get('/:id', orderController.getOrderById);

// Order status update ya cancel karna
router.patch('/:id/status', validateBody(['status']), orderController.updateOrderStatus);

module.exports = router;
