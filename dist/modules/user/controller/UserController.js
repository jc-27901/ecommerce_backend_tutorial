"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../service/UserService");
const userService = new UserService_1.UserService();
class UserController {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await userService.createUser(name, email, password);
            res.status(201).json({ user });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({ users });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.UserController = UserController;
