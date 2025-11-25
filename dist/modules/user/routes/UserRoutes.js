"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controller/UserController");
const express_1 = require("express");
const userController = new UserController_1.UserController();
const router = (0, express_1.Router)();
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
exports.default = router;
