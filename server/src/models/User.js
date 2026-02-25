const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,

  isDefault: {
    type: Boolean,
    default: false
  },
},  { _id: false });


const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "customer"
  },
  addresses: [addressSchema] 
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);