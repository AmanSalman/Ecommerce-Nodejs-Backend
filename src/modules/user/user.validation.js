import joi from 'joi'

export const IdSchema = joi.object({
  id: joi.string().hex().length(24).required(),
})