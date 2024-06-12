import { Router } from "express";
import * as productController from './product.controller.js';
import { endpoints } from "./product.role.js";
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
import reviewController from '../review/review.router.js'
const router = Router()
 
router.use('/:productId/review', reviewController)
router.post('/',auth(endpoints.create), fileUpload(fileType.image).fields([
    { name: 'MainImage', maxCount: 1 },
    { name: 'subImage', maxCount: 10 }
]) ,productController.create)

router.get('/',productController.getProducts)
router.get('/:id', productController.getDetails)
export default router; 