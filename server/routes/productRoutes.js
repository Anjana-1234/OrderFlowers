// Import express to create a router
const express = require('express');

// Create a router - this is like a mini-app just for product-related routes
const router = express.Router();

// Import our Product model so we can query the database
const Product = require('../models/Product');

// GET /api/products/flowers
// Returns only products where category is "flower"
router.get('/flowers', async (req, res) => {
  try {
    // Find all products in the database where category = 'flower'
    const flowers = await Product.find({ category: 'flower' });

    // Send them back to whoever requested this (our React app)
    res.json(flowers);
  } catch (error) {
    // If something goes wrong, send a 500 error with the message
    res.status(500).json({ message: 'Failed to fetch flowers', error: error.message });
  }
});

// GET /api/products/gifts
// Returns only products where category is "gift"
router.get('/gifts', async (req, res) => {
  try {
    const gifts = await Product.find({ category: 'gift' });
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gifts', error: error.message });
  }
});

// GET /api/products
// Returns ALL products (both flowers and gifts) - useful for admin views later
router.get('/', async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Export this router so server.js can use it
module.exports = router;