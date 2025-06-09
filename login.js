document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const signupLink = document.getElementById('signupLink');
  const backToLogin = document.getElementById('backToLogin');

  // Fake user DB (localStorage)
  function getUsers() {
    return JSON.parse(localStorage.getItem('visionkartUsers') || '{}');
  }

  function saveUsers(users) {
    localStorage.setItem('visionkartUsers', JSON.stringify(users));
  }

  signupLink.addEventListener('click', e => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });

  backToLogin.addEventListener('click', e => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const users = getUsers();

    if (users[email] && users[email] === password) {
      setUser(email);
      showNotification('Login successful!');
      setTimeout(() => window.location.href = 'home.html', 1000);
    } else {
      showNotification('Invalid email or password');
    }
  });

  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;

    const users = getUsers();

    if (users[email]) {
      showNotification('User already exists, please login');
      return;
    }

    users[email] = password;
    saveUsers(users);
    showNotification('Signup successful! Please login');
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });
});
