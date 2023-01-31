const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventories");

// Get all inventories
router.get("/", async (req, res) => {
try {
const inventories = await Inventory.find();
res.json(inventories);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

// Get inventory by type
router.get("/:inventoryType", async (req, res) => {
try {
const inventories = await Inventory.find({
inventory_type: req.params.inventoryType,
});
res.json(inventories);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

// Create new inventory
router.post("/", async (req, res) => {
const inventory = new Inventory({
inventory_id: req.body.inventory_id,
inventory_type: req.body.inventory_type,
item_name: req.body.item_name,
available_quantity: req.body.available_quantity,
});

try {
const newInventory = await inventory.save();
res.status(201).json(newInventory);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

module.exports = router;