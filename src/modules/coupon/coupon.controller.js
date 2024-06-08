import { CouponModel } from "../../../DB/models/Coupon.model.js"



export const create = async (req,res) =>{
  const {name,Amount} = req.body
  const coupon = await CouponModel.find({name})
  if(!coupon){
    return res.status(400).json({message:"coupon already exist"})
  }
  if(Amount <=0 || Amount > 100){
    return res.status(400).json({message:"invalid amount"})
  }
  req.body.expireDate = new Date(req.body.expireDate)
  const newCoupon = await CouponModel.create({name,Amount, createdBY:req.user.id, expireDate:req.body.expireDate})
  return res.status(200).json({message:"success", newCoupon})
}