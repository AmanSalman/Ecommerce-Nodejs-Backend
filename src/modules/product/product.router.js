import { Router } from "express";
import * as productController from './product.controller.js';
import { endpoints } from "./product.role.js";
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
const router = Router()
 

router.post('/',auth(endpoints.create), fileUpload(fileType.image).fields([
    { name: 'MainImage', maxCount: 1 },
    { name: 'subImage', maxCount: 10 }
]) ,productController.create)
export default router; 