import mongoose, { Schema, Types, model } from "mongoose";
//ctrl + H

const ReviewSchema = new Schema ({
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    productId:{
      type:Types.ObjectId,
      ref:'Product',
      required:true
    }
},{
  timestamps: true,
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
})

ReviewSchema.virtual('user', {
  ref:'User',
  localField:'userId',
  foreignField:'_id'
})




export const ReviewModel = model('Review', ReviewSchema);