import { Router } from "express";
import * as authController from './auth.controller.js';
import { checkEmail } from './../../middleware/checkEmail.js';
import { asyncHandler } from './../../utls/ErrorHandling.js';
import { ForgetPasswordSchema, loginSchema, registerSchema, SendCodeSchema } from "./auth.validation.js";
import { validation } from "../../middleware/validation.js";
const router = Router()

router.post ('/register',validation(registerSchema), checkEmail, authController.register);
router.post('/login', validation(loginSchema) , authController.login);
router.patch('/sendCode',validation(SendCodeSchema), authController.sendCode);
router.patch('/forgetpassword',validation(ForgetPasswordSchema), authController.forgetPassword)
router.post('/confirmEmail/:token', asyncHandler( authController.confirmEmail));
export default router; 
