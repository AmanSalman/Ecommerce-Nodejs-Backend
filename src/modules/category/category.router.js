import { Router } from "express";
import * as categoryController from './category.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth, roles } from "../../middleware/auth.js";
import subcategoryRouter from '../subcategory/subcategory.router.js';
import { endpoints } from "./category.role.js";
const router = Router()


router.use('/:id/subcategory/', subcategoryRouter);
router.post('/',auth(endpoints.create),fileUpload(fileType.image).single('image'), categoryController.Create);
router.get('/',auth([roles.Admin]),categoryController.getAll);
router.get('/active', categoryController.getActive);
router.get('/:id', categoryController.getDetails);
router.patch('/:id', auth(),fileUpload(fileType.image).single('image'), categoryController.update);
router.delete('/:id', categoryController.Delete );
export default router;