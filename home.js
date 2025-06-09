document.addEventListener('DOMContentLoaded', () => {
  checkLogin();

  const products = [
    {
      id: 1,
      name: 'Aviator Classic',
      price: 1299,
      image: 'images/glass1.jpg',
    },
    {
      id: 2,
      name: 'Round Frame',
      price: 999,
      image: 'images/glass2.jpg',
    },
    {
      id: 3,
      name: 'Wayfarer Style',
      price: 1499,
      image: 'images/glass3.jpg',
    },
  ];

  const productList = document.getElementById('productList');

  function renderProducts() {
    productList.innerHTML = '';
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <button class="add-cart" data-id="${p.id}">Add to Cart</button>
        <button class="add-wishlist" data-id="${p.id}">Add to Wishlist</button>
      `;
      productList.appendChild(card);
    });
  }

  function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty++;
    } else {
      cart.push({...product, qty: 1});
    }
    saveCart(cart);
    showNotification(`${product.name} added to cart`);
  }

  function addToWishlist(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    let wishlist = getWishlist();
    if (wishlist.find(i => i.id === id)) {
      showNotification(`${product.name} already in wishlist`);
      return;
    }
    wishlist.push(product);
    saveWishlist(wishlist);
    showNotification(`${product.name} added to wishlist`);
  }

  productList.addEventListener('click', e => {
    if (e.target.classList.contains('add-cart')) {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    } else if (e.target.classList.contains('add-wishlist')) {
      const id = parseInt(e.target.dataset.id);
      addToWishlist(id);
    }
  });

  document.getElementById('logoutLink').addEventListener('click', e => {
    e.preventDefault();
    logoutUser();
  });

  renderProducts();
});
