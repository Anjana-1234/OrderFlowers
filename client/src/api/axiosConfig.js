// Import axios to make HTTP requests
import axios from 'axios';

// Create a pre-configured axios instance pointing to our backend server
// This way we don't repeat "http://localhost:5000" in every file
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default api;