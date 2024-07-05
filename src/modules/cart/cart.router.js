import { Router } from "express";
import * as cartController from './cart.controller.js';
import {auth} from '../../middleware/auth.js'
import { endpoints } from "./cart.role.js";
import { validation } from './../../middleware/validation.js';
import { CRCart, QTyCart } from "./cart.validation.js";
const router = Router()

router.post('/', auth(endpoints.create),cartController.create)
router.put('/:productId', validation(CRCart), auth(endpoints.create),cartController.remove)
router.get('/', auth(endpoints.create),cartController.getCart)
router.put('/', auth(endpoints.create),cartController.clearcart)
router.post('/increaseQty/:productId', validation(CRCart), auth(endpoints.create), cartController.increasecart)
router.post('/decreaseQty/:productId', validation(CRCart), auth(endpoints.create), cartController.decreasecart)
router.post('/UpdateQty/:productId', validation(QTyCart), auth(endpoints.create), cartController.updateQty)

export default router;