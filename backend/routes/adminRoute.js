const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User");
const adminRoute = express.Router();

adminRoute.get("/", protect, admin, async (req, res) => {
  try {
    const user = await User.find(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

adminRoute.post("/users", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    user = new User({ name, email, password, role: role || "customer" });
    await user.save();

    res.json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});
adminRoute.put("/users/:id", protect, admin, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }

    const updateUser = await user.save();

    res.json({ message: "user updated successfully", user: updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

adminRoute.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = adminRoute;
