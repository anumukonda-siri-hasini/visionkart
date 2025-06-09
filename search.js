if (!localStorage.getItem("visionkart-loggedin")) {
  window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", e => {
  e.preventDefault();
  localStorage.removeItem("visionkart-loggedin");
  window.location.href = "index.html";
});

const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("search-results");

function renderProductsList(productsList, container) {
  container.innerHTML = "";
  if (productsList.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  productsList.forEach(product => {
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

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    resultsContainer.innerHTML = "<p>Enter a product name to search.</p>";
    return;
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProductsList(filtered, resultsContainer);
});

window.onload = () => {
  resultsContainer.innerHTML = "<p>Enter a product name to search.</p>";
};
