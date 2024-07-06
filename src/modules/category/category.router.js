import { Router } from "express";
import * as categoryController from './category.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth, roles } from "../../middleware/auth.js";
import subcategoryRouter from '../subcategory/subcategory.router.js';
import { endpoints } from "./category.role.js";
import { validation } from "../../middleware/validation.js";
import { createCategory, DeleteCategory, updateCategory } from "./category.validation.js";
const router = Router()


router.use('/:id/subcategory/', subcategoryRouter);
router.post('/',auth(endpoints.create),fileUpload(fileType.image).single('image'), validation(createCategory), categoryController.Create);
router.get('/',auth(endpoints.create),categoryController.getAll);
router.get('/active', categoryController.getActive);
router.get('/:id', validation(DeleteCategory), categoryController.getDetails);
router.patch('/:id', auth(endpoints.update), validation(updateCategory), fileUpload(fileType.image).single('image'), categoryController.update);
router.delete('/:id', auth(endpoints.delete), validation(DeleteCategory), categoryController.Delete );
router.get('/products/:id', categoryController.getProducts)
export default router;
