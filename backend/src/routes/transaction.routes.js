const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.use(authenticate);

// User-specific transactions history (buyer + seller)
router.get('/user', orderController.getUserTransactions);

// Admin-only: list all transactions
router.get('/', authorize('admin'), orderController.getAllTransactions);

// Specific transaction details
router.get('/:id', orderController.getOrderById);

module.exports = router;
