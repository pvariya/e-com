const express = require("express");
const Subscriber = require("../models/Subscriber");
const subscriberRoute = express.Router();

subscriberRoute.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "email id required" });
  }
  try {
    let subscriber = await Subscriber.findOne({ email: email });
    if (subscriber) {
      return res.status(400).json({ error: "email id already exists" });
    }
    subscriber = new Subscriber({ email: email });
    await subscriber.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = subscriberRoute;
