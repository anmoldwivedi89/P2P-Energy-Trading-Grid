const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: [true, 'Associated listing reference is required'],
      index: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Buyer reference is required'],
      index: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller reference is required'],
      index: true,
    },
    buyerName: {
      type: String,
      required: true,
      trim: true,
    },
    sellerName: {
      type: String,
      required: true,
      trim: true,
    },
    energyType: {
      type: String,
      required: true,
      default: 'Solar',
    },
    amountKwh: {
      type: Number,
      required: [true, 'Purchased energy (kWh) is required'],
      min: [0.1, 'Purchased energy must be at least 0.1 kWh'],
    },
    pricePerKwh: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: [0.01, 'Price per kWh must be at least 0.01'],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    platformFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total settlement price is required'],
      min: 0,
    },
    carbonOffsetKg: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Completed', 'Cancelled', 'Failed'],
        message: '{VALUE} is not a valid order status',
      },
      default: 'Completed',
      index: true,
    },
    gridNodeRoute: {
      type: String,
      default: 'Direct Microgrid Dispatch',
      trim: true,
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
