// Redirect to login if not logged in
if (!localStorage.getItem("visionkart-loggedin")) {
  window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", e => {
  e.preventDefault();
  localStorage.removeItem("visionkart-loggedin");
  window.location.href = "index.html";
});

function renderProducts(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
    `;

    container.appendChild(card);
  });
}

window.onload = () => {
  renderProducts("home-products");
};
