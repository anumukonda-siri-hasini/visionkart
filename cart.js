document.addEventListener('DOMContentLoaded', () => {
  checkLogin();

  const cartItemsDiv = document.getElementById('cartItems');
  const placeOrderBtn = document.getElementById('placeOrderBtn');

  function renderCart() {
    const cart = getCart();
    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      placeOrderBtn.style.display = 'none';
      return;
    }
    placeOrderBtn.style.display = 'block';

    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p class="price">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</p>
        <button class="btn-decrease" data-id="${item.id}">-</button>
        <button class="btn-increase" data-id="${item.id}">+</button>
        <button class="btn-remove" data-id="${item.id}">Remove</button>
      `;
      cartItemsDiv.appendChild(div);
    });
  }

  function updateQty(id, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart(cart);
    renderCart();
  }

  function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
  }

  cartItemsDiv.addEventListener('click', e => {
    if (e.target.classList.contains('btn-increase')) {
      updateQty(parseInt(e.target.dataset.id), 1);
    } else if (e.target.classList.contains('btn-decrease')) {
      updateQty(parseInt(e.target.dataset.id), -1);
    } else if (e.target.classList.contains('btn-remove')) {
      removeItem(parseInt(e.target.dataset.id));
    }
  });

  placeOrderBtn.addEventListener('click', () => {
    if (getCart().length === 0) {
      showNotification
