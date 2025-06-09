if (!localStorage.getItem("visionkart-loggedin")) {
  window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", e => {
  e.preventDefault();
  localStorage.removeItem("visionkart-loggedin");
  window.location.href = "index.html";
});

function renderCart() {
  const container = document.getElementById("cart-products");
  let cart = JSON.parse(localStorage.getItem("visionkart-cart")) || [];

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="removeFromCart(${product.id})">Remove from Cart</button>
      <button onclick="placeOrder(${product.id})">Buy Now</button>
    `;

    container.appendChild(card);
  });
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("visionkart-cart")) || [];
  cart = cart.filter(p => p.id !== id);
  localStorage.setItem("visionkart-cart", JSON.stringify(cart));
  renderCart();
}

function placeOrder(id) {
  let cart = JSON.parse(localStorage.getItem("visionkart-cart")) || [];
  const product = cart.find(p => p.id === id);
  if (product) {
    alert(`🎉 Order confirmed for: ${product.name}`);
    cart = cart.filter(p => p.id !== id);
    localStorage.setItem("visionkart-cart", JSON.stringify(cart));
    renderCart();
  }
}

window.onload = () => {
  renderCart();
};
