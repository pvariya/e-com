const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");
const adminOrder = express.Router();

adminOrder.get("/", protect, admin, async (req, res) => {
  try {
    const order = await Order.find({}).populate("user", "name email");
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// adminOrder.put("/:id", protect, admin, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.status = req.body.status || order.status;
//       order.isDelivered =
//         req.body.status === "Delivered" ? true : order.isDelivered;
//       order.deliveredAt =
//         req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
//       await order.save();
//       res.json(order);
//     } else {
//       res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// });
adminOrder.put("/:id", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findById(req.params.id).populate("user","name");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update order status
    order.status = status;
    if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

adminOrder.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});
module.exports = adminOrder;
