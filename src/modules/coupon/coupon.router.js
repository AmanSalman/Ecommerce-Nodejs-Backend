import { Router } from "express";
import * as CouponController from './coupon.controller.js'
import { endpoints } from "./coupon.role.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { createCoupon } from "./coupon.validation.js";
import { asyncHandler } from './../../utls/ErrorHandling.js';
const router = Router()




router.post('/', auth(endpoints.create), validation(createCoupon), asyncHandler( CouponController.create))



export default router