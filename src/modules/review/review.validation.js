import joi from 'joi';


export const createReview = joi.object({
  comment:joi.string().required(),
  rating:joi.number().min(1).max(5).required(),
  productId:joi.string().hex().length(24).required()
})
