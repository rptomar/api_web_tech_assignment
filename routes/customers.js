const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

router.get("/", async (req, res) => {
try {
const customers = await Customer.find();
res.json(customers);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

router.post("/", async (req, res) => {
const customer = new Customer({
customer_id: req.body.customer_id,
customer_name: req.body.customer_name,
email: req.body.email,
});

try {
const newCustomer = await customer.save();
res.status(201).json(newCustomer);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

module.exports = router;