const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
try {
const orders = await Order.find();
res.json(orders);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

router.post("/", async (req, res) => {
const order = new Order({
customer_id: req.body.customer_id,
inventory_id: req.body.inventory_id,
item_name: req.body.item_name,
quantity: req.body.quantity,
});

try {
const newOrder = await order.save();
res.status(201).json(newOrder);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

module.exports = router;