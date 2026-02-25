const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  amount: Number,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,

  status: {
    type: String,
    enum: ["success", "failed"],
    default: "success"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);