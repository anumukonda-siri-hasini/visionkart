// Simple localStorage-based login/signup simulation

const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");

document.getElementById("showSignup").addEventListener("click", e => {
  e.preventDefault();
  loginContainer.style.display = "none";
  signupContainer.style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", e => {
  e.preventDefault();
  signupContainer.style.display = "none";
  loginContainer.style.display = "block";
});

document.getElementById("signupForm").addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();

  if (!username || !password) {
    alert("Please fill all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("visionkart-users")) || [];
  if (users.find(u => u.username === username)) {
    alert("Username already exists!");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("visionkart-users", JSON.stringify(users));
  alert("Sign up successful! Please login.");
  signupContainer.style.display = "none";
  loginContainer.style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("visionkart-users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("visionkart-loggedin", username);
    alert(`Welcome, ${username}!`);
    window.location.href = "home.html";
  } else {
    alert("Invalid username or password!");
  }
});
