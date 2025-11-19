import { CartRepository } from "../repository/CartRepository";
import { ProductRepository } from "../../product/repository/ProductRepository";

export class CartService {
  private cartRepo = new CartRepository();
  private productRepo = new ProductRepository();

  async getUserCart(userId: string) {
    let cart = await this.cartRepo.getCartByUser(userId);

    if (!cart) {
      await this.cartRepo.createCart(userId);
      cart = await this.cartRepo.getCartByUser(userId);
    }

    return cart;
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    const product = await this.productRepo.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    let cart = await this.cartRepo.getCartByUser(userId);
    if(!cart) {
      throw new Error("Cart not found");
    }
   return await this.cartRepo.addItem(cart.id, productId, quantity);
  }

  async updateQuantity(userId: string, cartItemId: string, quantity: number) {

    const cart = await this.cartRepo.getCartByUser(userId);
    if(!cart) {
      throw new Error("Cart not found");
    }

    return await this.cartRepo.updateQuantity(cartItemId, quantity);
  }

  async removeFromCart(userId: string, cartItemId: string) {
    const cart = await this.cartRepo.getCartByUser(userId);
    if(!cart) {
      throw new Error("Cart not found");
    }

    return await this.cartRepo.removeItem(cartItemId);
  }

}
