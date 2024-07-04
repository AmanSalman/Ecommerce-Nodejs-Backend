import joi from 'joi';


export const createCoupon = joi.object({
  name:joi.string().min(3).required(),
  Amount:joi.number().min(1).max(50).optional(),
  expireDate: joi.date().greater('now')
})