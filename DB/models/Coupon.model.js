import mongoose, { Schema, Types, model } from "mongoose";

const CouponSchema = new Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  Amount:{
    type:Number,
    required:true
  },
  usedBy:[
    {
      type:Types.ObjectId,
      ref:'User',
      required:true
    }
  ],
  createdBY:{ 
    type:Types.ObjectId,
    ref:'User',
    // required:true
  },
  updatedBY:{
    type:Types.ObjectId,
    ref:'User',
  },

  expireDate:{
    type:Date,
    required:true
  }
})


export const CouponModel = model('Coupon', CouponSchema)