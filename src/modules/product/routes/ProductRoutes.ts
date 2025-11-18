import { authMiddleware } from "../../../core/middleware/authMiddleware";
import { allowedRoles } from "../../../core/middleware/roleMiddleware";
import { ProductController } from "../controller/ProductController";
import { Router } from "express";

const productController = new ProductController();

const productRouter = Router();

productRouter.post("/", authMiddleware, allowedRoles("admin"), productController.createProduct);
productRouter.get("/", productController.getProducts);

export default productRouter;
