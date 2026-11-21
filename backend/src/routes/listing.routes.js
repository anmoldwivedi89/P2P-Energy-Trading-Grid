const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listing.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { validateBody } = require('../middleware/validate.middleware');

// Public routes: Koi bhi user marketplace ki active energy listings browse kar sakta hai
router.get('/', listingController.getAllListings);

// Protected: Seller apni specific listings dekh sakta hai (declared before /:id)
router.get('/seller/my-listings', authenticate, authorize('seller', 'admin'), listingController.getMyListings);

// Public: Listing details by ID
router.get('/:id', listingController.getListingById);

// Protected: Prosumer dwara naya energy lot publish karna
router.post(
  '/',
  authenticate,
  authorize('seller', 'admin'),
  validateBody(['amount', 'pricePerKwh']),
  listingController.createListing
);

// Protected: Listing price ya amount modify karna
router.put('/:id', authenticate, authorize('seller', 'admin'), listingController.updateListing);

// Protected: Listing cancel karna
router.delete('/:id', authenticate, authorize('seller', 'admin'), listingController.deleteListing);

module.exports = router;
