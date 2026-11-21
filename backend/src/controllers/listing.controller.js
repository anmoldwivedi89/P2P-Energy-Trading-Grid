const Listing = require('../models/Listing');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors');
const { successResponse, createdResponse } = require('../utils/response');

// Marketplace ke liye all energy listings fetch karne ka function with dynamic filters
const getAllListings = async (req, res, next) => {
  try {
    const { energyType, search, status, minPrice, maxPrice, sort } = req.query;

    const query = {};

    // Listing status ke according filter (default: Active)
    if (status && status !== 'All') {
      query.status = status;
    } else if (!status) {
      query.status = 'Active';
    }

    // Solar, Wind, Hydro, Biomass source ke according filter
    if (energyType && energyType !== 'All') {
      query.energyType = energyType;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.pricePerKwh = {};
      if (minPrice) query.pricePerKwh.$gte = Number(minPrice);
      if (maxPrice) query.pricePerKwh.$lte = Number(maxPrice);
    }

    // Location ya seller name par case-insensitive search
    if (search && search.trim() !== '') {
      query.$or = [
        { sellerName: { $regex: search.trim(), $options: 'i' } },
        { location: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    // Sorting preferences
    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { pricePerKwh: 1 };
    if (sort === 'price_desc') sortOption = { pricePerKwh: -1 };
    if (sort === 'amount_desc') sortOption = { amount: -1 };

    const listings = await Listing.find(query).sort(sortOption);

    return successResponse(res, 'Listings fetched successfully', listings, 200, {
      total: listings.length,
      filter: query,
    });
  } catch (error) {
    next(error);
  }
};

// Single listing ki details fetch karna
const getListingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('seller', 'name email location rating');

    if (!listing) {
      throw new NotFoundError('Energy listing not found');
    }

    return successResponse(res, 'Listing details retrieved', listing);
  } catch (error) {
    next(error);
  }
};

// Prosumer dwara naya energy batch marketplace par publish karna
const createListing = async (req, res, next) => {
  try {
    const { energyType, amount, pricePerKwh, durationHours, location, smartMeterId } = req.body;

    const parsedAmount = Number(amount);
    const parsedPrice = Number(pricePerKwh);

    if (!parsedAmount || parsedAmount <= 0) {
      throw new BadRequestError('Energy amount must be greater than 0 kWh');
    }

    if (!parsedPrice || parsedPrice <= 0) {
      throw new BadRequestError('Price per unit must be greater than 0');
    }

    const duration = durationHours ? parseInt(durationHours, 10) : 24;
    const validUntil = new Date(Date.now() + duration * 60 * 60 * 1000);

    const listing = await Listing.create({
      seller: req.user._id,
      sellerName: req.user.name,
      location: location || req.user.location || 'Zone 4, Node 12',
      smartMeterId: smartMeterId || req.user.smartMeterId || 'SM-GEN-01',
      energyType: energyType || 'Solar',
      amount: parsedAmount,
      initialAmount: parsedAmount,
      pricePerKwh: parsedPrice,
      validUntil,
      status: 'Active',
    });

    return createdResponse(res, 'Energy listing created successfully', listing);
  } catch (error) {
    next(error);
  }
};

// Listing ko update karna (sirf seller ya admin ko permission hai)
const updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      throw new NotFoundError('Energy listing not found');
    }

    // Ownership check: sirf original seller ya grid admin hi update kar sakta hai
    if (listing.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ForbiddenError('You do not have permission to update this listing');
    }

    const allowedUpdates = ['pricePerKwh', 'amount', 'status', 'location', 'validUntil'];
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        listing[key] = req.body[key];
      }
    }

    await listing.save();
    return successResponse(res, 'Energy listing updated successfully', listing);
  } catch (error) {
    next(error);
  }
};

// Listing ko cancel karna
const deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      throw new NotFoundError('Energy listing not found');
    }

    // Ownership check
    if (listing.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ForbiddenError('You do not have permission to delete this listing');
    }

    listing.status = 'Cancelled';
    await listing.save();

    return successResponse(res, 'Listing cancelled successfully');
  } catch (error) {
    next(error);
  }
};

// Logged-in seller ki apni saari listings fetch karna
const getMyListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ seller: req.user._id }).sort({ createdAt: -1 });
    return successResponse(res, 'Seller listings fetched successfully', listings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getMyListings,
};
