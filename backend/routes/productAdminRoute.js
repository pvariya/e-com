const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const Product = require("../models/Product");
const productAdminRoute = express.Router();

productAdminRoute.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = productAdminRoute;
