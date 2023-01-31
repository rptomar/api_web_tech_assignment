const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_id: { type: String, required: true },
  inventory_id: { type: String, required: true },
  item_name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
