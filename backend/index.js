import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err.message));

app.get("/", (req, res) => {
  res.send("The Jersey Trove Backend is running");
});

//dealing with Products
app.use("/api/products", productRoutes);

//dealing with Users
app.use("/api/users", userRoutes);

//dealing with Orders
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`The server is running on PORT ${PORT}`);
});
