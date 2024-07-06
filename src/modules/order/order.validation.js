import joi from 'joi'


export const IdSchema = joi.object({
  id: joi.string().hex().length(24).required(),
})



export const OrderSchema = joi.object({
  couponId:joi.string().optional(),
  Address: joi.string().optional(),
  phone: joi.string().optional().pattern(/^(?:(?:\+970|0)(?:2|4|8|9)\d{7}|(?:\+970|0)5(?:6|9)\d{7})$|^(?:(?:\+972|0)(?:2|3|4|8|9)\d{7}|(?:\+972|0)5\d{7})$/)
})
