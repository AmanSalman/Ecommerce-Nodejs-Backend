import { Router } from "express";
import * as subcategoryController from './subcategory.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./subcategory.role.js";
import { validation } from "../../middleware/validation.js";
import { create, DeleteGet } from "./subcategory.validation.js";
const router = Router({mergeParams:true})


router.post('/',auth(endpoints.create),fileUpload(fileType.image).single('image'), validation(create), subcategoryController.Create);
router.get('/',auth(endpoints.getAll),subcategoryController.getAll);
router.get('/active', subcategoryController.getActive);
router.get('/:id', validation(DeleteGet), subcategoryController.getDetails);
router.patch('/:id', auth(endpoints.update) ,fileUpload(fileType.image).single('image'), validation(subcategoryController.update), subcategoryController.update);
router.delete('/:id', auth(endpoints.delete), validation(DeleteGet), subcategoryController.Delete )
export default router;   