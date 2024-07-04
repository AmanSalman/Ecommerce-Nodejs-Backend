import { Router } from "express";
import * as orderController from './order.controller.js';
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./order.role.js";
import { validation } from "../../middleware/validation.js";
import { IdSchema, OrderSchema } from "./order.validation.js";
const router = Router()

router.post('/', auth(endpoints.create),validation(OrderSchema), orderController.create)
router.get('/', auth(endpoints.get), orderController.getorders)
router.get('/changeStatus/:id', validation(IdSchema), auth(endpoints.getAll), orderController.changesStatus)
router.get('/all', auth(endpoints.getAll), orderController.orders)

export default router;