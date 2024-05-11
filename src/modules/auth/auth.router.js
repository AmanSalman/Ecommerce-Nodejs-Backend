import { Router } from "express";
import * as authController from './auth.controller.js';
const router = Router()

router.post ('/register', authController.register);
router.post('/login', authController.login);
router.patch('/sendCode', authController.sendCode);
router.patch('/forgetpassword', authController.forgetPassword)
export default router; 
