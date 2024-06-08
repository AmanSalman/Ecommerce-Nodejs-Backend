import { Router } from "express";
import * as orderController from './order.controller.js';
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./order.role.js";
const router = Router()

router.post('/', auth(endpoints.create), orderController.create)
router.get('/', auth(endpoints.get), orderController.getorders)
router.get('/changeStatus/:id', auth(endpoints.getAll), orderController.changesStatus)
router.get('/all', auth(endpoints.getAll), orderController.orders)

export default router;