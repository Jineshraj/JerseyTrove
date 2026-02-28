import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`The server is running on PORT ${PORT}`);
});
