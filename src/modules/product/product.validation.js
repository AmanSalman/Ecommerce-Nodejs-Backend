import joi from 'joi';

export const createProduct = joi.object({
  name:joi.string().min(3).required(),
  description:joi.string().required(),
  stock:joi.string().min(0).default(1),
  price:joi.number().min(1).required(),
  discount:joi.number().min(0).default(0).optional(),
  categoryId:joi.string().hex().length(24).required(), 
  subcategory:joi.string().hex().length(24).required(),
  sizes:joi.array().items(
    joi.string().valid('S','M','L','XL')
  ).optional(),
  colors:joi.string().optional(),
  MainImage:joi.array().items({
    fieldname:joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
    size: joi.number().max(5000000).required(),
}).max(1).required(),
subImage:joi.array().items(
  joi.object({
  fieldname:joi.string().required(),
  originalname: joi.string().required(),
  encoding: joi.string().required(),
  mimetype: joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
  destination: joi.string().required(),
  filename: joi.string().required(),
  path: joi.string().required(),
  size: joi.number().max(5000000).required(),
})).max(10).optional()
})