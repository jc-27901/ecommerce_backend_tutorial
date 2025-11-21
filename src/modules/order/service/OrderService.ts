import { OrderRepository } from "../repository/OrderRepository";
import { CartRepository } from "../../cart/repository/CartRepository";

export class OrderService {
    private orderRepo = new OrderRepository();
    private cartRepo = new CartRepository();

    async checkOut(userId: string, paymentMode: string){
        const cart = await this.cartRepo.getCartByUser(userId);
        if(!cart) {
            throw new Error("Cart not found");
        }
        // calculate total
        const subtotal = cart.items.reduce((acc, item) => 
            acc + item.product.price * item.quantity, 0);

        const tax = subtotal * 0.18;
        const total = subtotal + tax;

        // create order
        const order = await this.orderRepo.createOrder(userId, total, paymentMode);
        // create order items
        for(const item of cart.items) {
            await this.orderRepo.createOrderItem(
                order.id, item.productId, item.quantity, item.product.price);
        }
        // clear cart
        await this.cartRepo.clearCart(userId);
        return order;
    }

    async getOrdersByUser(userId: string){
        return this.orderRepo.getOrdersByUser(userId);
    }

    async getOrderDetail(orderId: string){
        return this.orderRepo.getOrderById(orderId);
    }
}