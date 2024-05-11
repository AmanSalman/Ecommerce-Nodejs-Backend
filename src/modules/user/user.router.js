import { Router } from "express";
import * as userController from './user.controller.js';
import { auth } from './../../middleware/auth.js';
const router = Router()


router.get('/',auth(), userController.getAll);
router.patch('/:id',auth(), userController.Disable);
router.patch('/Activate/:id', userController.Activate);
export default router; 

