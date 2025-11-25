"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repository/UserRepository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async createUser(name, email, password) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        return this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
    }
    async getAllUsers() {
        return this.userRepository.findAll();
    }
}
exports.UserService = UserService;
