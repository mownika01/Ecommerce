const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
{
  size: [String],
  color: [String],
  stock: {
    type: Number,
    default: 0
  },
  price: Number
},
{ _id: false }
);

const productSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: String,

  basePrice: {
    type: Number,
    required: true
  },

  images: [String],

  category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  required: true
},

  variants: [variantSchema],

  isActive: {
    type: Boolean,
    default: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);