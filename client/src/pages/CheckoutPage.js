// useState to manage form input values and submission status
import { useState } from 'react';

// useNavigate lets us redirect the user to another page after order is placed
import { useNavigate } from 'react-router-dom';

// Import our cart context to get items, total, and a way to clear the cart after order
import { useCart } from '../context/CartContext';

// Import our pre-configured axios instance
import api from '../api/axiosConfig';

function CheckoutPage() {

  // Get cart items, total, and a way to empty the cart after successful order
  const { cartItems, getCartTotal, clearCart } = useCart();

  // Lets us programmatically change the page after order succeeds
  const navigate = useNavigate();

  // Holds the values typed into the form
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    phone: '',
  });

  // Tracks whether the order is currently being submitted (to disable button, show loading)
  const [submitting, setSubmitting] = useState(false);

  // Tracks any error message if order submission fails
  const [error, setError] = useState(null);

  // Runs every time the user types in an input field
  // Updates the matching field in formData based on its "name" attribute
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Runs when the form is submitted
  async function handleSubmit(e) {
    // Prevent the default browser page-refresh behavior on form submit
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      // Build the order object to send to our backend
      const orderData = {
        items: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          type: item.type,
        })),
        totalAmount: getCartTotal(),
        customerName: formData.customerName,
        address: formData.address,
        phone: formData.phone,
      };

      // Send POST request to /api/orders
      const response = await api.post('/orders', orderData);

      // Clear the cart now that the order has been saved
      clearCart();

      // Redirect to a confirmation page, passing the new order's ID in the URL
      navigate(`/order-confirmation/${response.data._id}`);

    } catch (err) {
      setError('Something went wrong placing your order. Please try again.');
      setSubmitting(false);
    }
  }

  // If cart is empty, don't allow checkout - redirect-style message
  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h1 style={{ color: '#e91e8c' }}>Checkout</h1>
        <p>Your cart is empty. Add some items before checking out.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>

      <h1 style={{ color: '#e91e8c', textAlign: 'center' }}>Checkout 🌸</h1>

      {/* Order summary - quick recap of what's being ordered */}
      <div style={{
        backgroundColor: '#fff0f5',
        borderRadius: '10px',
        padding: '15px 20px',
        margin: '20px 0'
      }}>
        <h3 style={{ marginTop: 0, color: '#e91e8c' }}>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            padding: '4px 0'
          }}>
            <span>{item.name} × {item.quantity}</span>
            <span>£{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 'bold',
          marginTop: '10px',
          paddingTop: '10px',
          borderTop: '1px solid #e91e8c'
        }}>
          <span>Total</span>
          <span>£{getCartTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Delivery details form */}
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Full Name
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Delivery Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Show error message if order submission failed */}
        {error && (
          <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>{error}</p>
        )}

        {/* Submit button - disabled while submitting to prevent double-orders */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            backgroundColor: submitting ? '#ccc' : '#e91e8c',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '8px',
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>

      </form>

    </div>
  );
}

export default CheckoutPage;