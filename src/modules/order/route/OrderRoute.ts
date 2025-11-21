import { Router } from "express";
import { authMiddleware } from "../../../core/middleware/authMiddleware";
import { OrderController } from "../controller/OrderController";
const orderController = new OrderController();
const route = Router();

route.post('/checkout', authMiddleware, orderController.checkOut);
route.get('/', authMiddleware, orderController.myOrders);
route.get('/:orderId', authMiddleware, orderController.orderDetails);


export default route;
