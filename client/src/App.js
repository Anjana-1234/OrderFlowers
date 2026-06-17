// Import BrowserRouter for page navigation
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import CartProvider so the whole app can share cart data
import { CartProvider } from './context/CartContext';

// Import Navbar component
import Navbar from './components/Navbar';

// Import all pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import GiftsPage from './pages/GiftsPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    // CartProvider wraps everything so all pages can access cart functions
    <CartProvider>
      <BrowserRouter>

        {/* Navbar shows on every page */}
        <Navbar />

        {/* Routes - decides which page to show based on URL */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/gifts" element={<GiftsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;