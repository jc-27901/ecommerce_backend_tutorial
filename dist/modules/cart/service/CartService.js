"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const CartRepository_1 = require("../repository/CartRepository");
const ProductRepository_1 = require("../../product/repository/ProductRepository");
class CartService {
    constructor() {
        this.cartRepo = new CartRepository_1.CartRepository();
        this.productRepo = new ProductRepository_1.ProductRepository();
    }
    async getUserCart(userId) {
        let cart = await this.cartRepo.getCartByUser(userId);
        if (!cart) {
            await this.cartRepo.createCart(userId);
            cart = await this.cartRepo.getCartByUser(userId);
        }
        const cartItems = cart.items;
        // calculate total items
        const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        // calculate subtotal
        const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
        // calculate 18% gst tax(optional)
        const gstTax = subtotal * 0.18;
        const total = subtotal + gstTax;
        return {
            ...cart,
            totalItems,
            subtotal,
            gstTax,
            total,
        };
    }
    async addToCart(userId, productId, quantity) {
        const product = await this.productRepo.findById(productId);
        if (!product)
            throw new Error("Product not found");
        // ensure cart exists
        let cart = await this.cartRepo.getCartByUser(userId);
        if (!cart) {
            await this.cartRepo.createCart(userId);
            cart = await this.cartRepo.getCartByUser(userId);
        }
        return this.cartRepo.addItem(cart.id, productId, quantity);
    }
    async updateQuantity(userId, cartItemId, quantity) {
        const cart = await this.cartRepo.getCartByUser(userId);
        if (!cart) {
            throw new Error("Cart not found");
        }
        return await this.cartRepo.updateQuantity(cartItemId, quantity);
    }
    async removeFromCart(userId, cartItemId) {
        const cart = await this.cartRepo.getCartByUser(userId);
        if (!cart) {
            throw new Error("Cart not found");
        }
        return await this.cartRepo.removeItem(cartItemId);
    }
}
exports.CartService = CartService;
