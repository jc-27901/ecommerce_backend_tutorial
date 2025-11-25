"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const OrderService_1 = require("../service/OrderService");
const orderService = new OrderService_1.OrderService();
class OrderController {
    async checkOut(req, res) {
        try {
            const user = req.user;
            const { paymentMode } = req.body;
            const order = await orderService.checkOut(user.id, paymentMode);
            return res.status(201).json(order);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async myOrders(req, res) {
        try {
            const user = req.user;
            const orders = await orderService.getOrdersByUser(user.id);
            return res.status(200).json(orders);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async orderDetails(req, res) {
        try {
            const { orderId } = req.params;
            const order = await orderService.getOrderDetail(orderId);
            return res.status(200).json(order);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
exports.OrderController = OrderController;
