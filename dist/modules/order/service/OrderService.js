"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const OrderRepository_1 = require("../repository/OrderRepository");
const CartRepository_1 = require("../../cart/repository/CartRepository");
class OrderService {
    constructor() {
        this.orderRepo = new OrderRepository_1.OrderRepository();
        this.cartRepo = new CartRepository_1.CartRepository();
    }
    async checkOut(userId, paymentMode) {
        const cart = await this.cartRepo.getCartByUser(userId);
        if (!cart) {
            throw new Error("Cart not found");
        }
        // calculate total
        const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const tax = subtotal * 0.18;
        const total = subtotal + tax;
        // create order
        const order = await this.orderRepo.createOrder(userId, total, paymentMode);
        // create order items
        for (const item of cart.items) {
            await this.orderRepo.createOrderItem(order.id, item.productId, item.quantity, item.product.price);
        }
        // clear cart
        await this.cartRepo.clearCart(userId);
        return order;
    }
    async getOrdersByUser(userId) {
        return this.orderRepo.getOrdersByUser(userId);
    }
    async getOrderDetail(orderId) {
        return this.orderRepo.getOrderById(orderId);
    }
}
exports.OrderService = OrderService;
