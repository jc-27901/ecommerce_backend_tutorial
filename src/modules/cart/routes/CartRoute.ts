import { Router } from "express";
import { CartController } from "../controller/CartController";
import { authMiddleware } from "../../../core/middleware/authMiddleware";
import { allowedRoles } from "../../../core/middleware/roleMiddleware";


const cartController = new CartController();

const cartRouter = Router();

cartRouter.get("/", authMiddleware, cartController.getCart);
cartRouter.post("/", authMiddleware, cartController.addItem);
cartRouter.put("/", authMiddleware, cartController.updateQuantity);
cartRouter.delete("/", authMiddleware, cartController.removeItem);

export default cartRouter;
