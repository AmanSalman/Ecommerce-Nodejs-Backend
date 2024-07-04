import joi from 'joi';


export const registerSchema = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
})

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
})

export const ForgetPasswordSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  code:joi.string().length(4).required()
})


export const SendCodeSchema = joi.object({
  email: joi.string().email().required(),
})