// Import express to create our web server
const express = require('express');

// Import cors so our React app (different port) can talk to this server
const cors = require('cors');

// Import mongoose to connect and talk to MongoDB
const mongoose = require('mongoose');

// Import dotenv to load secret values from .env file
require('dotenv').config();

// Create the express app
const app = express();

// Middleware - lets our server accept JSON data in requests
app.use(express.json());

// Middleware - allows requests from our React app
app.use(cors());

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // This runs only if the connection succeeds
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((error) => {
    // This runs if the connection fails - shows the error reason
    console.log('❌ MongoDB connection failed:', error.message);
  });

// A simple test route - visiting this in browser confirms server works
app.get('/', (req, res) => {
  res.send('Valentine\'s Flowers API is running 🌸');
});

// Set the port - use 5000 unless something else is specified in .env
const PORT = process.env.PORT || 5000;

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});