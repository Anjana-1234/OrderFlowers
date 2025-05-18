document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "White Bouquet", price: 24, img: "images/white.jpeg", champagneImg: "images/white_champagne.jpeg" },
        { id: 2, name: "Pink Bouquet", price: 30, img: "images/pink.jpeg", champagneImg: "images/pink_champagne.jpeg" },
        { id: 3, name: "Red Bouquet", price: 35, img: "images/red.jpeg", champagneImg: "images/red_champagne.jpeg" },
        { id: 4, name: "Yellow Bouquet", price: 42, img: "images/yellow.jpeg", champagneImg: "images/yellow_champagne.jpeg" },
        { id: 5, name: "Blue Bouquet", price: 28, img: "images/blue.jpeg", champagneImg: "images/blue_champagne.jpeg" },
        { id: 6, name: "Multi Bouquet", price: 40, img: "images/multi.jpg", champagneImg: "images/multi_champagne.jpeg" },
        { id: 7, name: "Green Bouquet", price: 32, img: "images/green.jpg", champagneImg: "images/green_champagne.jpg" }
    ];
  
    const productList = document.getElementById("productList");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    function renderProducts() {
      productList.innerHTML = "";
      products.forEach((product, index) => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
          <img src="${product.img}" alt="${product.name}" width="150" />
          <h3>${product.name}</h3>
          <p>£${product.price}</p>
          <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        productList.appendChild(div);
      });
    }
  
    window.addToCart = function (index) {
      const product = products[index];
      const existing = cart.find(item => item.name === product.name);
  
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
    };
  
    window.goToCart = function () {
      if (cart.length === 0) {
        alert("Your cart is empty.");
      } else {
        window.location.href = "cart.html";
      }
    };
  
    renderProducts();
  });