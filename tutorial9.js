document.addEventListener("DOMContentLoaded", function() {
    const products = [
        { id: 1, name: "White Bouquet", price: 24, img: "images/white.jpeg" },
        { id: 2, name: "Pink Bouquet", price: 30, img: "images/pink.jpeg" },
        { id: 3, name: "Red Bouquet", price: 35, img: "images/red.jpeg" },
        { id: 4, name: "Yellow Bouquet", price: 42, img: "images/yellow.jpeg" },
        { id: 5, name: "Blue Bouquet", price: 28, img: "images/blue.jpeg" },
        { id: 6, name: "Multi Bouquet", price: 40, img: "images/multi.jpg" }
    ];
    
    const productList = document.getElementById("productList");
    const cart = [];
    
    function renderProducts() {
        productList.innerHTML = "";
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>£${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    }
    
    window.addToCart = function(id) {
        const product = products.find(p => p.id === id);
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({...product, quantity: 1});
        }
        renderCart();
    };
    
    function renderCart() {
        const cartDiv = document.getElementById("cart");
        const totalPriceEl = document.getElementById("totalPrice");
        cartDiv.innerHTML = "";
        let total = 0;
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartDiv.innerHTML += `<p>${item.name} (x${item.quantity}) - £${item.price * item.quantity}</p>`;
        });
        
        totalPriceEl.textContent = `£${total}`;
    }
    
    renderProducts();
});
