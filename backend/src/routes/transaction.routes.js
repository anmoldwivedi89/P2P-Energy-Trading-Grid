const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// Sabhi transaction routes par valid JWT session mandatory hai
router.use(authenticate);

// Current logged-in user ki transaction history (buyer aur seller dono)
router.get('/user', orderController.getUserTransactions);

// Admin-only: Grid par hue sabhi participants ke settled transactions ki audit trail
router.get('/', authorize('admin'), orderController.getAllTransactions);

// Specific transaction details by ID
router.get('/:id', orderController.getOrderById);

module.exports = router;
