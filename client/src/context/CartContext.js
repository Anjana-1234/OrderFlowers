// Import tools needed to create and share context across components
import { createContext, useContext, useState } from 'react';

// Create the context - this is like a shared storage box
const CartContext = createContext();

// CartProvider wraps our whole app so every page can access the cart
export function CartProvider({ children }) {

  // cartItems holds the array of everything in the cart
  // each item looks like: { id, name, price, image, quantity, type }
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  function addToCart(item) {
    setCartItems((prevItems) => {

      // Check if this exact item is already in the cart
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        // If it exists, increase its quantity by 1
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // If it's new, add it to the cart with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }

  // Function to remove an item completely from the cart
  function removeFromCart(id) {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
  }

  // Function to change the quantity of a specific item (+1 or -1)
  function updateQuantity(id, amount) {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === id) {
            // Calculate new quantity based on +1 or -1 passed in
            const newQuantity = item.quantity + amount;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        // Remove any item whose quantity dropped to 0 or below
        .filter((item) => item.quantity > 0);
    });
  }

  // Function to calculate the total price of everything in the cart
  function getCartTotal() {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Function to count total number of items (for navbar cart icon badge)
  function getCartCount() {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  // Provide these values and functions to any page that needs them
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook so pages can easily use the cart with one line:
// const { cartItems, addToCart } = useCart();
export function useCart() {
  return useContext(CartContext);
}