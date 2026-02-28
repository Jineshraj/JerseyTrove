import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

//POST route for REGISTER new users
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body; //gathering data from req body

  try {
    //GUARD CLAUSE: check if all of feilds are present
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the feilds" });
    }

    //GUARD CLAUSE : check if current user exists
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res
        .status(400)
        .json({ success: false, message: "This email already exist" });
    }

    //HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    //CREATE new User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    //Save the user to DB
    await newUser.save();

    //ASSIGN JWT key : payload , secretkey , option
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(201).json({
      success: true,
      message: "New user created successfully!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token: token,
    });
  } catch (error) {
    console.log("Registration error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

//POST route to LOGIN eexisting users
router.post("/login", async (req, res) => {
  const { email, password } = req.body; //gather data from request

  try {
    //GUARD CLAUSE : check if email/password exists
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    //Check if Email already exists in db
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    //Check password : compare via bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    //GENERATE JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(201).json({
      success: true,
      message: "Login successful!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log("Login error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
