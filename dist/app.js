"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = __importDefault(require("./modules/user/routes/UserRoutes"));
const AuthRoute_1 = __importDefault(require("./modules/user/routes/AuthRoute"));
const CategoryRoutes_1 = __importDefault(require("./modules/category/routes/CategoryRoutes"));
const ProductRoutes_1 = __importDefault(require("./modules/product/routes/ProductRoutes"));
const errorLogger_1 = require("./core/middleware/errorLogger");
const CartRoute_1 = __importDefault(require("./modules/cart/routes/CartRoute"));
const OrderRoute_1 = __importDefault(require("./modules/order/route/OrderRoute"));
const swagger_1 = __importDefault(require("./core/utils/swagger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(errorLogger_1.errorLogger);
app.get("/", (req, res) => {
    res.send("E-commerce backend running...");
});
app.use('/users', UserRoutes_1.default);
app.use('/auth', AuthRoute_1.default);
app.use('/categories', CategoryRoutes_1.default);
app.use('/products', ProductRoutes_1.default);
app.use('/cart', CartRoute_1.default);
app.use('/orders', OrderRoute_1.default);
app.use('/docs', swagger_1.default);
exports.default = app;
