import { authMiddleware } from "../../../core/middleware/authMiddleware";
import { handleMulter } from "../../../core/middleware/handleMulter";
import { allowedRoles } from "../../../core/middleware/roleMiddleware";
import { upload } from "../../../core/middleware/uploadMiddleware";
import { ProductController } from "../controller/ProductController";
import { Router } from "express";

const productController = new ProductController();

const productRouter = Router();

productRouter.post("/", authMiddleware,
    allowedRoles("admin"),
    handleMulter(upload.array("images", 5)),
    productController.createProduct);
productRouter.get("/", productController.getProducts);

export default productRouter;
