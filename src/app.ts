import express from "express";
import userRoutes from "./modules/user/routes/UserRoutes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-commerce backend running...");
});

app.use('/users', userRoutes);

export default app;
