"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserRepository_1 = require("../repository/UserRepository");
class AuthService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid credentials');
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET || 'access123', { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET || 'refresh123', { expiresIn: '7d' });
        return { accessToken, refreshToken, user: {
                id: user.id,
                email: user.email,
                role: user.role,
            } };
    }
}
exports.AuthService = AuthService;
