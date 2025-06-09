// Product List
const products = [
  {
    id: 1,
    name: "Blue Frame Glasses",
    price: 999,
    image: "https://tse4.mm.bing.net/th?id=OIP.EQez0MXL3QtXVCctOqPI1AAAAA&pid=Api&P=0&h=180"
  },
  {
    id: 2,
    name: "Black Square Glasses",
    price: 1299,
    image: "https://www.iwearforall.com/wp-content/uploads/2017/09/alexblackmattefront_1.jpg"
  },
  {
    id: 3,
    name: "Aviator Sunglasses",
    price: 899,
    image: "https://shady-rays.s3.us-east-2.amazonaws.com/assets/ascend/AV-10/01.jpg"
  },
  {
    id: 4,
    name: "Classic Reading Glasses",
    price: 499,
    image: "https://tse2.mm.bing.net/th?id=OIP.WMbufyFkLL3ALVKZb4oL5wHaE8&pid=Api&P=0&h=180"
  },
  {
    id: 5,
    name: "Premium Gold Glasses",
    price: 1499,
    image: "https://cdn.shopify.com/s/files/1/0550/4670/1130/files/Apex_Gold-Marble_Clear_Face.jpg?v=1654165143"
  },
  {
    id: 6,
    name: "Kids' Stylish Frame",
    price: 799,
    image: "https://tse1.mm.bing.net/th?id=OIP.-j53J6hmnrqKEI8NyemTBgHaHa&pid=Api&P=0&h=180"
  }
  {
  id: 7,
  name: "Smart Blue Light Glasses",
  price: 1199,
  image: "https://image4.cdnsbg.com/2/58/612473_1664861716732.jpg?width=1200&height=600"
},
{
  id: 8,
  name: "Polarized Sunglasses",
  price: 1599,
  image: "https://i5.walmartimages.com/asr/a80e6e02-792a-479d-9ef1-900bd495011a_1.0d337c2433b0ed3e57e894a7b7239bf7.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"
},
{
  id: 9,
  name: "Retro Round Glasses",
  price: 1099,
  image: "https://res.ygstatic.com/frame/1357/13573/1/2.1400.1659448369-dc2.jpg"
},
{
  id: 10,
  name: "Transparent Frame Glasses",
  price: 899,
  image: "https://tse3.mm.bing.net/th?id=OIP.N5GSNfOOt4gcwEtj-iVlrgHaEz&pid=Api&P=0&h=180"
},
{
  id: 11,
  name: "Wayfarer Style Glasses",
  price: 1399,
  image: "https://tse3.mm.bing.net/th?id=OIP.FSImdW4oGgmyDlhp4UnDpgHaDt&pid=Api&P=0&h=180"
},
{
  id: 12,
  name: "Men’s Classic Sunglasses",
  price: 1699,
  image: "https://tse1.mm.bing.net/th?id=OIP.Yaw55xZRoF9VLYDFP1iL-AHaHa&pid=Api&P=0&h=180"
}

];

// Renders products on a given page into a container
function renderProducts(containerId, page = "home") {
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

// Add product to cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("visionkart-cart")) || [];
  const product = products.find(p => p.id === productId);

  // Avoid duplicates
  if (!cart.some(p => p.id === productId)) {
    cart.push(product);
    localStorage.setItem("visionkart-cart", JSON.stringify(cart));
    alert("✅ Product added to cart!");
  } else {
    alert("⚠️ Product already in cart!");
  }
}

// Add product to wishlist
function addToWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("visionkart-wishlist")) || [];
  const product = products.find(p => p.id === productId);

  // Avoid duplicates
  if (!wishlist.some(p => p.id === productId)) {
    wishlist.push(product);
    localStorage.setItem("visionkart-wishlist", JSON.stringify(wishlist));
    alert("💖 Added to wishlist!");
  } else {
    alert("⚠️ Already in wishlist!");
  }
}

// Remove product from cart or wishlist
function removeFromStorage(id, key, reload = true) {
  let data = JSON.parse(localStorage.getItem(key)) || [];
  data = data.filter(item => item.id !== id);
  localStorage.setItem(key, JSON.stringify(data));
  if (reload) location.reload();
}

// Render cart or wishlist
function renderList(containerId, key) {
  const container = document.getElementById(containerId);
  const list = JSON.parse(localStorage.getItem(key)) || [];

  if (list.length === 0) {
    container.innerHTML = "<p>No items found.</p>";
    return;
  }

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      ${
        key === "visionkart-cart"
          ? `<button onclick="removeFromStorage(${product.id}, 'visionkart-cart')">Remove from Cart</button>
             <button onclick="placeOrder(${product.id})">Buy Now</button>`
          : `<button onclick="removeFromStorage(${product.id}, 'visionkart-wishlist')">Remove from Wishlist</button>`
      }
    `;

    container.appendChild(card);
  });
}

// Simulate order
function placeOrder(productId) {
  let cart = JSON.parse(localStorage.getItem("visionkart-cart")) || [];
  const product = cart.find(p => p.id === productId);

  if (product) {
    alert(`🎉 Order confirmed for: ${product.name}`);
    cart = cart.filter(p => p.id !== productId);
    localStorage.setItem("visionkart-cart", JSON.stringify(cart));
    location.reload();
  }
}
