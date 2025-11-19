import { CartService } from "../service/CartService";
import { Request, Response } from "express";

const cartService = new CartService();

export class CartController {
    async getCart(req: Request, res: Response) {
        const user = (req as any).user;
        const cart = await cartService.getUserCart(user.id);
        return res.status(200).json(cart);
    }

    async addItem(req: Request, res: Response) {
        try {
        const user = (req as any).user;
        const { productId, quantity } = req.body;
        const cartItem = await cartService.addToCart(user.id, productId, quantity);
        return res.status(201).json(cartItem);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateQuantity(req: Request, res: Response) {
        try {
        const user = (req as any).user;
        const { cartItemId, quantity } = req.body;
        const cartItem = await cartService.updateQuantity(user.id, cartItemId, Number(quantity));
        return res.status(200).json(cartItem);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async removeItem(req: Request, res: Response) {
        try {
        const user = (req as any).user;
        const { cartItemId } = req.body;
        const cartItem = await cartService.removeFromCart(user.id, cartItemId);
        return res.status(200).json(cartItem);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

}