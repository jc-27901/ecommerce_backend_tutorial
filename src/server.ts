import app from "./app";
import dotenv from "dotenv";
const port = 3000;


dotenv.config();
app.listen(port, () => {
  console.log(`E-commerce backend running on port ${port}`);
});
