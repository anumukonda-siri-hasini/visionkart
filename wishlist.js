if (!localStorage.getItem("visionkart-loggedin")) {
  window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", e => {
  e.preventDefault();
  localStorage.removeItem("visionkart-loggedin");
  window.location.href = "index.html";
});

function renderWishlist() {
  const container = document.getElementById("wishlist-products");
  let wishlist = JSON.parse(localStorage.getItem("visionkart-wishlist")) || [];

  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  wishlist.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="removeFromWishlist(${product.id})">Remove from Wishlist</button>
    `;

    container.appendChild(card);
  });
}

function removeFromWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("visionkart-wishlist")) || [];
  wishlist = wishlist.filter(p => p.id !== id);
  localStorage.setItem("visionkart-wishlist", JSON.stringify(wishlist));
  renderWishlist();
}

window.onload = () => {
  renderWishlist();
};
