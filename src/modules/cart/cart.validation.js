import joi from 'joi'

export const CRCart = joi.object({
  id:joi.string().hex().length(24).required(),
})