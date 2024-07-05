import joi from 'joi'

export const CRCart = joi.object({
  id:joi.string().hex().length(24).required(),
})

export const QTyCart = joi.object({
  id:joi.string().hex().length(24).required(),
  quantity:joi.number().required(),
  operator:joi.string().required(),
})