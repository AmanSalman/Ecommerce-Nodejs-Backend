import mongoose from "mongoose";
import { CartModel } from './../../../DB/models/cart.model.js';

export const create = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await CartModel.findOne({ userId: req.user._id });

    if (!cart) {
      const newCart = await CartModel.create({
        userId: req.user._id,
        products: [{ productId: new mongoose.Types.ObjectId(productId) }]
      });
      return res.status(200).json({ message: "success", cart: newCart });
    }

    const productExists = cart.products.some(
      (product) => product.productId.toString() === productId
    );

    if (productExists) {
      return res.status(400).json({ message: "product already added" });
    }

    cart.products.push({ productId: new mongoose.Types.ObjectId(productId) });
    await cart.save();

    return res.status(200).json({ message: "success", cart });
  } catch (error) {
    console.error("Error creating/updating cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const remove = async (req,res) =>{
    const {productId} = req.params;
    const cart = await CartModel.findOneAndUpdate({userId: req.user._id},
        {$pull: {products: {productId:productId}}},
        {new: true}
    )
    return res.status(200).json({message:"success", cart})
}

export const getCart = async (req,res) =>{
    const cart = await CartModel.findOne({userId: req.user._id});
    if(!cart){
        return res.status(404).json({message:"cart not found"})
    }
    return res.status(200).json({message:"success", cart})
}


export const clearcart = async (req,res) =>{
    const cart = await CartModel.findOneAndUpdate({userId: req.user._id},
        {$set: {products: []}},
        {new: true}
    );
    return res.status(200).json({message:"success", cart})
}


export const increasecart = async (req,res) => {
    const {quantity} = req.body
    const cart = await CartModel.findOneAndUpdate({userId:req.user._id ,
        "products.productId":req.params.productId
    },{
        $inc: {
            "products.$.quantity": quantity
        }
    }, {new:true})
    return res.status(200).json({message:"success", cart})
}


export const decreasecart = async (req,res) => {
    const {quantity} = req.body
    const cart = await CartModel.findOneAndUpdate({userId:req.user._id ,
        "products.productId":req.params.productId
    },{
        $inc: {
            "products.$.quantity": -quantity
        }
    }, {new:true})
    return res.status(200).json({message:"success", cart})
}

export const updateQty = async (req,res) => {
    const {quantity, operator} = req.body
    const change = (operator == "+")?quantity:-quantity;

    const cart = await CartModel.findOneAndUpdate({userId:req.user._id ,
        "products.productId":req.params.productId
    },{
        $inc: {
            "products.$.quantity": change
        }
    }, {new:true})
    return res.status(200).json({message:"success", cart})
}