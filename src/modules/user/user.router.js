import { Router } from "express";
import * as userController from './user.controller.js';
import { auth } from './../../middleware/auth.js';
import { endpoints } from "./user.role.js";
const router = Router()


router.get('/',auth(endpoints.getAll), userController.getAll);
router.get('/userData',auth(endpoints.userData), userController.userData);
router.patch('/:id',auth(endpoints.getAll), userController.Disable);
router.patch('/Activate/:id',auth(endpoints.getAll), userController.Activate);
export default router; 

