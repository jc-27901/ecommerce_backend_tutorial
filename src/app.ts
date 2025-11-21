import express from "express";
import userRoutes from "./modules/user/routes/UserRoutes";
import authRoutes from "./modules/user/routes/AuthRoute";
import categoryRoutes from "./modules/category/routes/CategoryRoutes";
import productRoutes from "./modules/product/routes/ProductRoutes";
import { errorLogger } from "./core/middleware/errorLogger";
import cartRouter from "./modules/cart/routes/CartRoute";
import orderRouter from "./modules/order/route/OrderRoute";

const app = express();
app.use(express.json());
app.use(errorLogger);


app.get("/", (req, res) => {
  res.send("E-commerce backend running...");
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

export default app;
