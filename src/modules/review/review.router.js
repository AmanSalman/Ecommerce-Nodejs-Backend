import { Router } from "express";
import * as reviewController from './review.controller.js';
import { endpoints } from "./review.role.js";
import { auth } from "../../middleware/auth.js";
const router = Router({mergeParams:true})

router.post('/', auth(endpoints.create), reviewController.create );

export default router;
