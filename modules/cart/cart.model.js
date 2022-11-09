const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Types.ObjectId, ref: "Product" },
  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
