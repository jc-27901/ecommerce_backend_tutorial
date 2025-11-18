import { Router } from "express";
import { AuthController } from "../controller/AuthController";

const authRouter = Router();
const controller = new AuthController();

authRouter.post("/login", controller.login);

export default authRouter;
