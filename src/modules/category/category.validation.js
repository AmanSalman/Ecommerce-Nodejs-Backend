import joi from 'joi'

export const createCategory = joi.object({
  name: joi.string().min(3).max(30).required(),
  status: joi.string().valid('active', 'inactive'),
  image:joi.object({
      fieldname:joi.string().required(),
      originalname: joi.string().required(),
      encoding: joi.string().required(),
      mimetype: joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
      destination: joi.string().required(),
      filename: joi.string().required(),
      path: joi.string().required(),
      size: joi.number().max(5000000).required(),
  }).required()
})

export const updateCategory = joi.object({
  id:joi.string().hex().length(24).required(),
  status: joi.string().valid('active', 'inactive'),
  name: joi.string().min(3).max(30),
  image:joi.object({
      fieldname:joi.string().required(),
      originalname: joi.string().required(),
      encoding: joi.string().required(),
      mimetype: joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
      destination: joi.string().required(),
      filename: joi.string().required(),
      path: joi.string().required(),
      size: joi.number().max(5000000).required(),
  }).optional()
})



export const DeleteCategory = joi.object({
  id:joi.string().hex().length(24).required(),
})