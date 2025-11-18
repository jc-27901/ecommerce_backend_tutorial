import { AuthController } from '../controller/AuthController';
import { Router } from 'express';

const authController = new AuthController();
const authRouter = Router();

authRouter.post('/login', authController.login);

export default authRouter;
