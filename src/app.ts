import express from "express";
import userRoutes from "./modules/user/routes/UserRoutes";
import authRoutes from "./modules/user/routes/AuthRoute";
import categoryRoutes from "./modules/category/routes/CategoryRoutes";
import productRoutes from "./modules/product/routes/ProductRoutes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-commerce backend running...");
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

export default app;
