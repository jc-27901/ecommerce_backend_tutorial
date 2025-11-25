"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CartRepository {
    createCart(userId) {
        return prisma.cart.create({ data: { userId } });
    }
    getCartByUser(userId) {
        return prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true }
                }
            }
        });
    }
    addItem(cartId, productId, quantity) {
        return prisma.cartItem.upsert({
            where: {
                cartId_productId: {
                    cartId,
                    productId
                }
            },
            update: {
                quantity: { increment: quantity }
            },
            create: {
                cartId,
                productId,
                quantity
            }
        });
    }
    updateQuantity(cartItemId, quantity) {
        return prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity }
        });
    }
    removeItem(cartItemId) {
        return prisma.cartItem.delete({
            where: { id: cartItemId }
        });
    }
    clearCart(cartId) {
        return prisma.cartItem.deleteMany({
            where: { cartId }
        });
    }
}
exports.CartRepository = CartRepository;
