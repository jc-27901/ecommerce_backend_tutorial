import { UserController } from '../controller/UserController';
import { Router } from 'express';

const userController = new UserController();
const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

export default router;

