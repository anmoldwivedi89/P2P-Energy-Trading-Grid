const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// Sabhi dashboard endpoints ke liye valid JWT authentication zaroori hai
router.use(authenticate);

// Buyer Dashboard Telemetry: Buyer aur Admin dono ko access allow hai
router.get('/buyer/dashboard', authorize('buyer', 'admin'), dashboardController.getBuyerDashboard);
router.get('/buyer', authorize('buyer', 'admin'), dashboardController.getBuyerDashboard);

// Seller Dashboard Telemetry: Seller aur Admin dono ko access allow hai
router.get('/seller/dashboard', authorize('seller', 'admin'), dashboardController.getSellerDashboard);
router.get('/seller', authorize('seller', 'admin'), dashboardController.getSellerDashboard);

// Admin Dashboard Telemetry: Sirf Administrator ko hi consolidated grid telemetry ka access hai
router.get('/admin/dashboard', authorize('admin'), dashboardController.getAdminDashboard);
router.get('/admin', authorize('admin'), dashboardController.getAdminDashboard);

module.exports = router;
