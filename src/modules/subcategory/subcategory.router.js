import { Router } from "express";
import * as subcategoryController from './subcategory.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
const router = Router({mergeParams:true})


router.post('/',auth(['Admin','User']),fileUpload(fileType.image).single('image'), subcategoryController.Create);
router.get('/',auth(),subcategoryController.getAll);
router.get('/active', subcategoryController.getActive);
router.get('/:id', subcategoryController.getDetails);
router.patch('/:id', auth(),fileUpload(fileType.image).single('image'), subcategoryController.update);
router.delete('/:id', subcategoryController.Delete )
export default router;   