import { Router } from "express";
import * as cartController from './cart.controller.js';
import {auth} from '../../middleware/auth.js'
import { endpoints } from "./cart.role.js";
const router = Router()

router.post('/', auth(endpoints.create),cartController.create)
router.put('/:productId', auth(endpoints.create),cartController.remove)
router.get('/', auth(endpoints.create),cartController.getCart)
router.put('/', auth(endpoints.create),cartController.clearcart)
// router.post('/increaseQty/:productId', auth(endpoints.create), cartController.increasecart)
// router.post('/decreaseQty/:productId', auth(endpoints.create), cartController.decreasecart)
router.post('/UpdateQty/:productId', auth(endpoints.create), cartController.updateQty)

export default router;