// Import mongoose to define our schema
const mongoose = require('mongoose');

// Define the structure (schema) for a product document in MongoDB
// This applies to BOTH flowers and gifts - the "category" field tells them apart
const productSchema = new mongoose.Schema({

  // Name of the product, e.g. "Red Bouquet" or "Teddy Bear"
  name: {
    type: String,
    required: true, // every product MUST have a name
  },

  // Price in pounds
  price: {
    type: Number,
    required: true,
  },

  // Image path/filename - we'll store the filename and serve images separately
  image: {
    type: String,
    required: true,
  },

  // Category tells us if this is a "flower" or a "gift"
  category: {
    type: String,
    enum: ['flower', 'gift'], // only these two values are allowed
    required: true,
  },

  // Color is only relevant for flowers (used for filtering on shop page)
  // Optional field - gifts won't have this
  color: {
    type: String,
    default: null,
  },

}, {
  // Automatically adds createdAt and updatedAt timestamps to every product
  timestamps: true,
});

// Create and export the Product model based on this schema
// Mongoose will create a "products" collection in MongoDB automatically
module.exports = mongoose.model('Product', productSchema);