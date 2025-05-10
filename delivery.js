document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const champagneAdded = JSON.parse(localStorage.getItem("champagne")) || false;
  
    const cartSummary = document.getElementById("cartSummary");
    const totalPriceEl = document.getElementById("totalPrice");
    const deliveryDateInput = document.getElementById("deliveryDate");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const finalSummary = document.getElementById("finalSummary");
  
    let total = 0;
  
    // Render cart summary
    if (cart.length === 0) {
      cartSummary.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const p = document.createElement("p");
        p.textContent = `${item.name} (x${item.quantity}) - £${itemTotal}`;
        cartSummary.appendChild(p);
      });
  
      if (champagneAdded) {
        total += 10;
        const p = document.createElement("p");
        p.textContent = "Champagne Added - £10";
        cartSummary.appendChild(p);
      }
    }
  
    totalPriceEl.textContent = `£${total.toFixed(2)}`;
  
    // Set today's date as minimum
    const today = new Date().toISOString().split("T")[0];
    deliveryDateInput.setAttribute("min", today);
  
    // Handle order confirmation
    document.getElementById("confirmOrder").addEventListener("click", function () {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const deliveryDate = deliveryDateInput.value;
  
      // Simple validation
      if (!name || !email || !deliveryDate) {
        alert("Please fill in all required fields.");
        return;
      }
  
      const selectedDate = new Date(deliveryDate);
      const currentDate = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
  
      if (selectedDate <= currentDate) {
        alert("Please select a future delivery date.");
        return;
      }
  
      // Show final confirmation modal
      finalSummary.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Delivery Date:</strong> ${deliveryDate}</p>
        <p><strong>Total Paid:</strong> £${total.toFixed(2)}</p>
      `;
  
      document.getElementById("confirmationModal").classList.add("show");
  
      // Optional: clear cart
      localStorage.removeItem("cart");
      localStorage.removeItem("champagne");
    });
  });
  
  // Close modal
  function closeModal() {
    document.getElementById("confirmationModal").classList.remove("show");
  }
  
  // Mobile nav toggle (if needed)
  function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
  }
  