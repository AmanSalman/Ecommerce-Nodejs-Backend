import { Router } from "express";
import * as CouponController from './coupon.controller.js'
import { endpoints } from "./coupon.role.js";
import { auth } from "../../middleware/auth.js";
const router = Router()




router.post('/', auth(endpoints.create), CouponController.create)



export default router