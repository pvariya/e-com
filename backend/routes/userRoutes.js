const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { protect } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    user = new User({ name, email, password });
    await user.save();

    const tokenData = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(tokenData, "private-key");
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPass = await bcrypt.compare(password, user.password);
    // const isPass = await user.matchPassword(password)
    if (!isPass) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const tokenData = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(tokenData, "private-key");
    res.json({
      msg: "user login Succesfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).send("Server error");
  }
});



userRouter.get("/profile",protect,async(req,res)=>{
  res.json(req.user)
} )
module.exports = userRouter;
