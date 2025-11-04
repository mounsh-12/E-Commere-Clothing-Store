const products = [
  { id: 1, name: "Men's White Shirt", price: 799, image: "https://assets.ajio.com/medias/sys_master/root/20230619/mxHu/64900b37d55b7d0c63b512b8/-473Wx593H-466051992-white-MODEL.jpg" },
  { id: 2, name: "Women's Floral Dress", price: 1199, image: "https://assets.ajio.com/medias/sys_master/root/20230616/HX2I/648b1b38a9b42d15c9d7c9ff/-473Wx593H-466000555-yellow-MODEL.jpg" },
  { id: 3, name: "Blue Denim Jeans", price: 1499, image: "https://assets.ajio.com/medias/sys_master/root/20230825/G36T/64e8b3d5ddf7791519b3e91c/-473Wx593H-441153532-blue-MODEL.jpg" },
  { id: 4, name: "Black Hoodie", price: 999, image: "https://assets.ajio.com/medias/sys_master/root/20221123/bdA6/637dfd1eaeb269659c5b8c8e/-473Wx593H-441151066-black-MODEL.jpg" },
  { id: 5, name: "Cotton T-Shirt", price: 499, image: "https://assets.ajio.com/medias/sys_master/root/20230712/VYlm/64ae7b73a9b42d15c97e9864/-473Wx593H-466120801-white-MODEL.jpg" }
];

const productList = document.getElementById('productList');
const cartItems = document.getElementById('cartItems');
const totalSpan = document.getElementById('total');
let total = 0;

// Display products
function showProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Add to Cart
function addToCart(id) {
  const item = products.find(p => p.id === id);
  const li = document.createElement('li');
  li.textContent = `${item.name} - ₹${item.price}`;
  cartItems.appendChild(li);
  total += item.price;
  totalSpan.textContent = total;
}

// Payment
function proceedToPayment() {
  const name = document.getElementById('custName').value;
  const address = document.getElementById('custAddress').value;
  const method = document.getElementById('paymentMethod').value;

  if (!name || !address || !method) {
    alert("Please fill in all payment details!");
    return;
  }

  if (method === "gpay") {
    window.open("https://pay.google.com/", "_blank");
  } else if (method === "paytm") {
    window.open("https://paytm.com/", "_blank");
  } else if (method === "phonepe") {
    window.open("https://www.phonepe.com/", "_blank");
  } else {
    alert("Order placed successfully! Pay with cash on delivery.");
  }

  alert("✅ Payment Processed Successfully!\nThank you for shopping with us!");
  cartItems.innerHTML = "";
  total = 0;
  totalSpan.textContent = total;
}

// Signup
function signup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }
  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  alert("Account created successfully!");
  showLogin();
}

// Login
function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.password === password) {
    alert("Login successful!");
    showStore();
  } else {
    alert("Invalid email or password!");
  }
}

// Logout
function logout() {
  alert("Logged out successfully!");
  showLogin();
}

// Navigation
function showSignup() {
  document.getElementById('loginPage').style.display = "none";
  document.getElementById('signupPage').style.display = "block";
  document.getElementById('storePage').style.display = "none";
}

function showLogin() {
  document.getElementById('loginPage').style.display = "block";
  document.getElementById('signupPage').style.display = "none";
  document.getElementById('storePage').style.display = "none";
}

function showStore() {
  document.getElementById('loginPage').style.display = "none";
  document.getElementById('signupPage').style.display = "none";
  document.getElementById('storePage').style.display = "block";
  showProducts();
}
