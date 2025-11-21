import { OrderService } from "../service/OrderService";
import { Request, Response } from "express";
const orderService = new OrderService();
export class OrderController {
    
    async checkOut(req: Request, res: Response){
       try{
        const user = (req as any).user;
        const {paymentMode} = req.body;
        const order = await orderService.checkOut(user.id, paymentMode);
        return res.status(201).json(order);
       } catch(err: any){
        res.status(400).json({error: err.message});
       }
    }

    async myOrders(req: Request, res: Response){
        try{
            const user = (req as any).user;
            const orders = await orderService.getOrdersByUser(user.id);
            return res.status(200).json(orders);
        } catch(err: any){
            res.status(400).json({error: err.message});
        }
    }
    
    async orderDetails(req: Request, res: Response){
        try{
            const {orderId} = req.params;
            const order = await orderService.getOrderDetail(orderId);
            return res.status(200).json(order);
        } catch(err: any){
            res.status(400).json({error: err.message});
        }
    }

}