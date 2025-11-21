import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class OrderRepository {

    createOrder(userId: string, total: number, paymentMode: string){
        return prisma.order.create({
            data: {
                userId,
                total,
                paymentMode,
            }
        });
    }

    createOrderItem(orderId: string, productId: string, quantity: number, price: number){
        return prisma.orderItem.create({
            data: {
                orderId,
                productId,
                quantity,
                price,
            }
        });
    }

    getOrdersByUser(userId: string){
        return prisma.order.findMany({
            where: {
                userId,
            },
                include: {
                    items: true,
                }
        })
    }

    getOrderById(orderId: string){
        return prisma.order.findUnique({
            where:{
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