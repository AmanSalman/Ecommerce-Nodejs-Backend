import { Router } from "express";
import * as authController from './auth.controller.js';
import { checkEmail } from './../../middleware/checkEmail.js';
import { asyncHandler } from './../../utls/ErrorHandling.js';
const router = Router()

router.post ('/register', checkEmail, authController.register);
router.post('/login', authController.login);
router.patch('/sendCode', authController.sendCode);
router.patch('/forgetpassword', authController.forgetPassword)
router.post('/confirmEmail/:token', asyncHandler( authController.confirmEmail));
export default router; 
