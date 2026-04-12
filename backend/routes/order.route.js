import express from "express";
import Order from "../models/Orders.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully !",
      order: savedOrder,
    });
  } catch (error) {
    console.log(`DATABASE ERROR : ${error.message}`);
    res.status(500).json({
      error: "Failed to Place Order",
      details: error.message,
    });
  }
});

router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(`DATABASE ERROR: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

export default router;
