// Notifications
function showNotification(message, duration = 3000) {
  const container = document.getElementById('notification-container');
  if (!container) return;

  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = message;

  container.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = '0';
    notif.style.transition = 'opacity 0.5s ease-out';
    setTimeout(() => {
      container.removeChild(notif);
    }, 500);
  }, duration);
}

// Session Management: Simple fake login state in localStorage
function setUser(email) {
  localStorage.setItem('visionkartUser', email);
}

function getUser() {
  return localStorage.getItem('visionkartUser');
}

function logoutUser() {
  localStorage.removeItem('visionkartUser');
  window.location.href = 'index.html';
}

function checkLogin() {
  if (!getUser()) {
    window.location.href = 'index.html';
  }
}

// Cart functions
function getCart() {
  return JSON.parse(localStorage.getItem('visionkartCart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('visionkartCart', JSON.stringify(cart));
}

// Wishlist functions
function getWishlist() {
  return JSON.parse(localStorage.getItem('visionkartWishlist') || '[]');
}

function saveWishlist(wishlist) {
  localStorage.setItem('visionkartWishlist', JSON.stringify(wishlist));
}
