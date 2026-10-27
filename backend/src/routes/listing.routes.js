const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listing.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { validateBody } = require('../middleware/validate.middleware');

// Public listing browsing
router.get('/', listingController.getAllListings);

// Protected: Seller's own listings (Declared BEFORE /:id route)
router.get('/seller/my-listings', authenticate, authorize('seller', 'admin'), listingController.getMyListings);

// Public: View single listing details
router.get('/:id', listingController.getListingById);

// Protected: Prosumer creates new energy listing
router.post(
  '/',
  authenticate,
  authorize('seller', 'admin'),
  validateBody(['amount', 'pricePerKwh']),
  listingController.createListing
);

// Protected: Seller/Admin updates a listing
router.put('/:id', authenticate, authorize('seller', 'admin'), listingController.updateListing);

// Protected: Seller/Admin cancels a listing
router.delete('/:id', authenticate, authorize('seller', 'admin'), listingController.deleteListing);

module.exports = router;
