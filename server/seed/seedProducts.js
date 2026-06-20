// Import mongoose to connect to MongoDB
const mongoose = require('mongoose');

// Import dotenv to load our MONGO_URI from .env
require('dotenv').config();

// Import our Product model
const Product = require('../models/Product');

// All flower bouquets - matches your existing flowersData.js
// Note: image field is just the filename, since actual image files
// live in the React app's assets folder (frontend handles displaying them)
const flowers = [
  { name: 'White Bouquet', price: 24, image: 'white-bouquet.jpg', category: 'flower', color: 'White' },
  { name: 'Pink Bouquet', price: 30, image: 'pink-bouquet.jpg', category: 'flower', color: 'Pink' },
  { name: 'Red Bouquet', price: 35, image: 'red-bouquet.jpg', category: 'flower', color: 'Red' },
  { name: 'Yellow Bouquet', price: 42, image: 'yellow-bouquet.jpg', category: 'flower', color: 'Yellow' },
];

// All gift items - matches your existing giftsData.js
const gifts = [
  { name: 'Teddy Bear', price: 10, image: 'teddy-bear.jpg', category: 'gift' },
  { name: 'Chocolate Box (Small)', price: 6, image: 'chocolate-small.jpg', category: 'gift' },
  { name: 'Chocolate Box (Medium)', price: 10, image: 'chocolate-medium.jpg', category: 'gift' },
  { name: 'Chocolate Box (Large)', price: 15, image: 'chocolate-large.jpg', category: 'gift' },
  { name: 'Keytag', price: 4, image: 'keytag.jpg', category: 'gift' },
  { name: 'Table Ornament', price: 12, image: 'table-ornament.jpg', category: 'gift' },
];

// Function that connects to DB, clears old data, and inserts fresh data
async function seedDatabase() {
  try {
    // Connect to MongoDB using our connection string
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' Connected to MongoDB');

    // Delete all existing products first (so we don't get duplicates)
    await Product.deleteMany({});
    console.log(' Cleared existing products');

    // Insert all flowers and gifts into the database
    await Product.insertMany([...flowers, ...gifts]);
    console.log(` Inserted ${flowers.length} flowers and ${gifts.length} gifts`);

    console.log(' Seeding complete!');
  } catch (error) {
    // If anything goes wrong, log the error
    console.log(' Seeding failed:', error.message);
  } finally {
    // Always close the connection when done, whether success or failure
    mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase();