import { Schema, Types, model } from "mongoose";


const cartSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    products:[{
        productId:{
            type:Types.ObjectId,
            ref:'Product',
            required:true
        }, 
        quantity:{
            type:Number,
            default:1
        },
    }]
},{
    timestamps:true
})


export const CartModel = model('Cart',cartSchema)
