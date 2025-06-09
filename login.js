function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Dummy credentials (can be replaced with localStorage signup values)
  const storedUser = localStorage.getItem("visionkart-user");
  const storedPass = localStorage.getItem("visionkart-pass");

  if ((username === storedUser && password === storedPass) || (username === "admin" && password === "admin")) {
    alert("Login successful!");
    window.location.href = "home.html";
  } else {
    alert("Invalid username or password.");
  }
}
