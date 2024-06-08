import { ReviewModel } from '../../../DB/models/review.model.js';
import { OrderModel } from './../../../DB/models/order.model.js';



export const create = async (req,res) =>{
  const {productId} = req.params
  const {comment , rating} = req.body

  const order = await OrderModel.findOne({
    userId:req.user.id,
    // status:'delivered',
    "products.productId":productId
  })

  if(!order){
    return res.status(404).json({message:'can review this product'})
  }

  const checkReview =  await ReviewModel.findOne({
    userId:req.user._id,
    productId:productId
  })
  if(checkReview){
    return res.status(400).json({message:'you have already reviewed this product'})
  }
  const newReview = await ReviewModel.create({
    userId:req.user._id,
    productId:productId,
    comment:comment,
    rating:rating 
  })

  return res.status(201).json({message:'success', newReview})
}