"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const authRouter = (0, express_1.Router)();
const controller = new AuthController_1.AuthController();
authRouter.post("/login", controller.login);
exports.default = authRouter;
