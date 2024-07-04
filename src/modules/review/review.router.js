import { Router } from "express";
import * as reviewController from './review.controller.js';
import { endpoints } from "./review.role.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { createReview } from "./review.validation.js";
const router = Router({mergeParams:true})

router.post('/', auth(endpoints.create),validation(createReview), reviewController.create );

export default router;
