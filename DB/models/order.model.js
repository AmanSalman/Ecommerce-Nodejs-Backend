import mongoose, { Schema, Types } from "mongoose";

const OrderSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    productId: {
      type: Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    unitPrice: {
      type: Number,
      required: true
    },
    finalPrice: {  // Changed 'FinalPrice' to 'finalPrice' to keep consistent casing
      type: Number,
      required: true
    }
  }],
  finalPrice: {
    type: Number,
    required: true
  },
  address: {  // Changed 'Address' to 'address' to keep consistent casing
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  couponId: {
    type: Types.ObjectId,
    ref: 'Coupon'
  },
  paymentType: {
    type: String,
    enum: ['cash', 'card'],
    default: 'cash',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'cancelled', 'confirmed', 'onway'],
    default: 'pending',
    required: true
  },
  createdBy: {  // Changed 'createdBY' to 'createdBy' to keep consistent casing
    type: Types.ObjectId,
    ref: 'User',
    // required: true
  },
  updatedBy: {  // Changed 'updatedBY' to 'updatedBy' to keep consistent casing
    type: Types.ObjectId,
    ref: 'User'
  }
});

export const OrderModel = mongoose.model('Order', OrderSchema);
