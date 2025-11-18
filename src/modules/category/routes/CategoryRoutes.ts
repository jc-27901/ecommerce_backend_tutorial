import { authMiddleware } from "../../../core/middleware/authMiddleware";
import { allowedRoles } from "../../../core/middleware/roleMiddleware";
import { CategoryController } from "../controller/CategoryController";
import {Router} from 'express';

const categoryController = new CategoryController();
const router = Router();

router.post('/', authMiddleware,allowedRoles("admin"), categoryController.createCategory);
router.get('/', categoryController.listCategories);

export default router;