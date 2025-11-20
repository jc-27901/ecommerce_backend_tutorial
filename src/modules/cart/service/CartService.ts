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

    const cartItems = cart!.items;
    // calculate total items
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    // calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    // calculate 18% gst tax(optional)
    const gstTax = subtotal * 0.18;
    const total = subtotal + gstTax;

    return {
      ...cart!,
      totalItems,
      subtotal,
      gstTax,
      total,
    };
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new Error("Product not found");

    // ensure cart exists
    let cart = await this.cartRepo.getCartByUser(userId);
    if (!cart) {
      await this.cartRepo.createCart(userId);
      cart = await this.cartRepo.getCartByUser(userId);
    }

    return this.cartRepo.addItem(cart!.id, productId, quantity);
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
