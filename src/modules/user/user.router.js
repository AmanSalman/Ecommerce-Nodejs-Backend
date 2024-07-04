import { Router } from "express";
import * as userController from './user.controller.js';
import { auth } from './../../middleware/auth.js';
import { endpoints } from "./user.role.js";
import { validation } from "../../middleware/validation.js";
import { IdSchema } from "./user.validation.js";
const router = Router()


router.get('/',auth(endpoints.getAll), userController.getAll);
router.get('/userData',auth(endpoints.userData), userController.userData);
router.patch('/:id',auth(endpoints.getAll), validation(IdSchema), userController.Disable);
router.patch('/Activate/:id',auth(endpoints.getAll), validation(IdSchema), userController.Activate);
export default router; 

