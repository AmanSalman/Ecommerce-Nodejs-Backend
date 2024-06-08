
import { OrderModel } from '../../../DB/models/order.model.js';
import { ProductModel } from '../../../DB/models/product.model.js';
import { CartModel } from './../../../DB/models/cart.model.js';
import { UserModel } from './../../../DB/models/user.model.js';
import { CouponModel } from './../../../DB/models/Coupon.model.js';

export const create = async (req,res) =>{
  const cart = await CartModel.find({userId:req.user.id})
  if(!cart|| cart.products.length === 0){
    return res.status(400).json({message:'cart is empty'})
  }

  req.body.products= cart[0].products

  if(req.body.couponId){
    const coupon = await CouponModel.findById(req.body.couponId)
    if(!coupon){
      return res.status(400).json({message:'coupon not found'})
    }
    if(coupon.expireDate < Date.now()){
      return res.status(400).json({message:'coupon is expired'})
    }
    if(coupon.usedBy.includes(req.user.id)){
      return res.status(400).json({message:'coupon is already used'})
    }
    req.body.coupon = coupon
  }

  let finalProductList = []
  let subtotal = 0
  for(let product of req.body.products){
    const checkproduct = await ProductModel.findOne({
      _id:product.productId,
      stock:{$gte:product.quantity}
    })
    if(!checkproduct){
      return res.status(400).json({message:'product quantity not available'})
    }

    product = product.toObject()
    product.name = checkproduct.name
    product.discount = checkproduct.discount
    product.unitPrice = checkproduct.price
    product.finalPrice = checkproduct.FinalPrice
    subtotal+= product.finalPrice
    finalProductList.push(product)
  }

  const user = await UserModel.findById(req.user.id)
  if(!req.body.Address){
    req.body.Address = user.address
  }
  if(!req.body.phone){
    req.body.phone = user.phone
  }

  const order = await OrderModel.create({
    userId: req.user.id,
    products: finalProductList,
    finalPrice: subtotal - (subtotal * ((req.body.coupon?.Amount || 0 )/100)),
    address: req.body.Address,
    phone: req.body.phone,
  })

    
  if(order){
    for(const product of req.body.products){
      const updateproduct = await ProductModel.findOneAndUpdate(
        { _id: product.productId },
        { $inc: { stock: -product.quantity } }
      )
      
    }

    if (req.body.coupon) {
      await CouponModel.findByIdAndUpdate({_id:req.body.coupon._id}, {
        $addToSet:{
          usedBy:req.user.id
        }
      })
    }

    await CartModel.findOneAndUpdate({userId:req.user.id}, {
        products:[]
    }) 
  }

  return res.status(200).json({message:"success", order})
}


export const getorders = async (req, res) => {
  const orders = await OrderModel.find({userId:req.user.id}).populate('userId')
  return res.status(200).json({message:"success", orders})
}


export const orders = async (req, res) => {
  const orders = await OrderModel.find({
    $or:[
      {
        status:'pending'
      },
      {
        status:'confirmed'
      }
    ]
  })
  return res.status(200).json({message:"success", orders})
}


export const changesStatus = async (req,res) =>{
  const {status} = req.body
  const {id} = req.params
  const order = await OrderModel.findById(id)
  if(!order){
    return res.status(404).json({message:"order not found"})
  }
  order.status = status
  await order.save()
  return res.json(order)
}