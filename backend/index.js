import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err.message));

app.get("/", (req, res) => {
  res.send("The Jersey Trove Backend is running");
});

app.listen(5000, () => {
  console.log(`The server is running on PORT ${PORT}`);
});
