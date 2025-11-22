// server.js
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_Rf8dintt8rUfec",
  key_secret: "0BnkRT0jey1A4KOusGQ54uDd",
});

app.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100, 
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
