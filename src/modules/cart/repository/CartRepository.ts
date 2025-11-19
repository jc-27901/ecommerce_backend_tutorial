import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CartRepository {
  createCart(userId: string) {
    return prisma.cart.create({ data: { userId } });
  }

  getCartByUser(userId: string) {
    return prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: { product: true }
            }
        }
    });
  }

  addItem(cartId: string, productId:string, quantity: number){
    return prisma.cartItem.upsert({
        where: {
            cartId_productId: {
                cartId,
                productId
            }
        },
        update: {
            quantity : {increment: quantity}
        },
        create: {
            cartId,
            productId,
            quantity
        }
    });
  }

  updateQuantity(cartItemId: string, quantity: number){
    return prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity }
    });
  }

  removeItem(cartItemId: string){
    return prisma.cartItem.delete({
        where: { id: cartItemId }
    });
  }

}
