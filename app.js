// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const port = 3005;

// app.use(express.json());
// app.set("view engine", "ejs");

// mongoose.connect("mongodb://localhost/api_web_tech_assignment", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to MongoDB");
// });

// app.listen(port, () => {
//   console.log(`Server started at port ${port}`);
// });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Order = require("./models/orders");
const Customer = require("./models/customers");
const Inventory = require("./models/inventories");

app.use(express.json());
app.use("/orders", require("./routes/orders"));
app.use("/customers", require("./routes/customers"));
app.use("/inventories", require("./routes/inventories"));

// Connect to MongoDB
mongoose
.connect("mongodb://localhost/api_web_tech_assignment", {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB", err));

// Place order
app.post("/createOrder", async (req, res) => {
try {
const customer = await Customer.findOne({
customer_id: req.body.customer_id,
});
if (!customer) {
return res.status(400).json({ message: "Invalid Customer ID" });
}
const inventory = await Inventory.findOne({
    item_name: req.body.item_name,
  });
  if (!inventory) {
    return res.status(400).json({ message: "Item not found in inventory" });
  }
  if (inventory.available_quantity < req.body.quantity) {
    return res.status(400).json({ message: "Out of Stock" });
  }
  
  const order = new Order({
    customer_id: req.body.customer_id,
    inventory_id: inventory.inventory_id,
    item_name: req.body.item_name,
    quantity: req.body.quantity,
  });
  
  const newOrder = await order.save();
  inventory.available_quantity -= req.body.quantity;
  await inventory.save();
  
  res.status(201).json({ message: "Order placed successfully" });
} catch (err) {
    res.status(500).json({ message: err.message });
    }
    });
    
    // Get item quantity sold
    app.get("/itemName/availableQuantity", async (req, res) => {
    try {
    const orders = await Order.find({ item_name: req.query.item_name });
    const quantity = orders.reduce((acc, order) => acc + order.quantity, 0);
    res.json({ item_name: req.query.item_name, quantity });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    });
    
    const port = process.env.PORT || 3005;
    app.listen(port, () => {
    console.log("Listning on port 3005");
    });  