"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const CartService_1 = require("../service/CartService");
const cartService = new CartService_1.CartService();
class CartController {
    async getCart(req, res) {
        const user = req.user;
        const cart = await cartService.getUserCart(user.id);
        return res.status(200).json(cart);
    }
    async addItem(req, res) {
        try {
            const user = req.user;
            const { productId, quantity } = req.body;
            const cartItem = await cartService.addToCart(user.id, productId, quantity);
            return res.status(201).json(cartItem);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async updateQuantity(req, res) {
        try {
            const user = req.user;
            const { cartItemId, quantity } = req.body;
            const cartItem = await cartService.updateQuantity(user.id, cartItemId, Number(quantity));
            return res.status(200).json(cartItem);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async removeItem(req, res) {
        try {
            const user = req.user;
            const { cartItemId } = req.body;
            const cartItem = await cartService.removeFromCart(user.id, cartItemId);
            return res.status(200).json(cartItem);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.CartController = CartController;
