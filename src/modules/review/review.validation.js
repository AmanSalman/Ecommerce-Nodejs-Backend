import joi from 'joi';


export const createReview = joi.object({
  comment:joi.string().required(),
  rating:joi.number().min(1).max(5).required()
})