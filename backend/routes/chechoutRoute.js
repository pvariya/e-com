const express = require("express");
const Checkout = require("../models/checkout");
const { protect } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const checkoutRoute = express.Router();

checkoutRoute.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in the checkout" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,

      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`checkout created for user ${req.user._id}`);
    res.status(200).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout:", error);
    res.status(500).send("Server error");
  }
});

checkoutRoute.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (error) {
    console.error("Error updating checkout:", error);
    res.status(500).send("Server error");
  }
});

checkoutRoute.post("/:id/finalize", protect, async (req, res) => {
  try {

    const checkout = await Checkout.findOneAndUpdate({
      id: req.params.id,
      isFinalized: false,
    });
    console.log(checkout);
if (!checkout) {
  return res.status(404).json({ message: "Checkout not found" });
}
if (checkout.isPaid && !checkout.isFinalized) {
  const finalOrder = await Order.create({
    user: checkout.user,
    orderItems: checkout.checkoutItems,
    shippingAddress: checkout.shippingAddress,
    paymentMethod: checkout.paymentMethod,
    totalPrice: checkout.totalPrice,
    isPaid: true,
    paidAt: checkout.paidAt,
    isDelivered: false,
    paymentMethod: checkout.paymentMethod,
    paymentStatus: "paid",
  });

  checkout.isFinalized = true;
  checkout.finalizedAt = Date.now();
  await checkout.save();
  await Cart.findOneAndDelete({ user: checkout.user });
  res.status(200).json(finalOrder);
} else if (checkout.isFinalized) {
  res.status(400).json({ message: "Checkout has already been finalized" });
} else {
  res.status(400).json({ message: "Checkout is not paid" });
}
  } catch (error) {
    console.error("Error finalizing checkout:", error);
    res.status(500).send("Server error");
  }
});


module.exports = checkoutRoute;
