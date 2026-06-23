// Import express to create a router
const express = require('express');
const router = express.Router();

// Import our Order model
const Order = require('../models/Order');

// POST /api/orders
// Creates a new order - called when user clicks "Proceed to Checkout"
router.post('/', async (req, res) => {
  try {
    // req.body contains the order data sent from React
    // Create a new Order document using that data
    const newOrder = new Order(req.body);

    // Save it to MongoDB
    const savedOrder = await newOrder.save();

    // Send back the saved order (includes its new _id from MongoDB)
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// GET /api/orders/:id
// Fetches a single order by its ID - useful for an order confirmation page
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
});

// Export this router so server.js can use it
module.exports = router;