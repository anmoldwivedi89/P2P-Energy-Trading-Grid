const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller reference is required'],
      index: true,
    },
    sellerName: {
      type: String,
      required: [true, 'Seller name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Grid location is required'],
      trim: true,
    },
    energyType: {
      type: String,
      enum: {
        values: ['Solar', 'Wind', 'Hydro', 'Biomass', 'Grid Backup'],
        message: '{VALUE} is not a supported energy source',
      },
      default: 'Solar',
      index: true,
    },
    amount: {
      type: Number,
      required: [true, 'Available energy amount (kWh) is required'],
      min: [0, 'Available energy cannot be negative'],
    },
    initialAmount: {
      type: Number,
      required: [true, 'Initial energy amount is required'],
      min: [0.1, 'Initial energy must be at least 0.1 kWh'],
    },
    pricePerKwh: {
      type: Number,
      required: [true, 'Unit price per kWh is required'],
      min: [0.01, 'Price per kWh must be at least 0.01'],
    },
    smartMeterId: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['Active', 'Sold', 'Reserved', 'Cancelled', 'Expired'],
        message: '{VALUE} is not a valid listing status',
      },
      default: 'Active',
      index: true,
    },
    validUntil: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // Default 24 hours expiry
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Virtual for sold amount
listingSchema.virtual('soldAmount').get(function () {
  return Math.max(0, this.initialAmount - this.amount);
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
