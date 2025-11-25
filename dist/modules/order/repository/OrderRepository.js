"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class OrderRepository {
    createOrder(userId, total, paymentMode) {
        return prisma.order.create({
            data: {
                userId,
                total,
                paymentMode,
            }
        });
    }
    createOrderItem(orderId, productId, quantity, price) {
        return prisma.orderItem.create({
            data: {
                orderId,
                productId,
                quantity,
                price,
            }
        });
    }
    getOrdersByUser(userId) {
        return prisma.order.findMany({
            where: {
                userId,
            },
            include: {
                items: true,
            }
        });
    }
    getOrderById(orderId) {
        return prisma.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            }
        });
    }
}
exports.OrderRepository = OrderRepository;
