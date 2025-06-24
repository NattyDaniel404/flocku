"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // THEME SWITCHER
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  toggle.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
  });


  // TAB SWITCHER

  const comicsTab = document.getElementById("comicsTab");
  const storeTab = document.getElementById("storeTab");
  const comicSection = document.getElementById("comicsSection");
  const storeSection = document.getElementById("storeSection");

  comicsTab.addEventListener("click", () => {
  comicsSection.style.display = "block";
  storeSection.style.display = "none";
});
storeTab.addEventListener("click", () => {
  comicsSection.style.display = "none";
  storeSection.style.display = "block";
});


  

  // FORM SUBMISSION
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked');

    if (!fullName || !comments || !contactMethod) {
      successMessage.textContent = "";
      alert("Please fill out your name, comment, and select a contact method.");
      return;
    }

    const customer = {
      name: fullName,
      phone: phone,
      email: email,
      comments: comments,
      preferredContact: contactMethod.value
    };

    successMessage.innerHTML = `
      <p>Thank you, ${customer.name}! We'll contact you by ${customer.preferredContact} for chapter updates!</p>
    `;

    form.reset();
  });
});



// CART SYSTEM


const products = {
  book: { name: "Comic Book", price: 10 },
  print: { name: "Art Print", price: 7 },
  sticker: { name: "Sticker Pack", price: 3 }
};

let cart = [];

// Add to Cart Buttons
document.querySelectorAll(".product button").forEach(button => {
  button.addEventListener("click", () => {
    const productKey = button.dataset.product;
    cart.push(products[productKey]);
    updateCartDisplay();
  });
});

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  cartItems.innerHTML = ""; // Clear list

  let subtotal = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    subtotal += item.price;
  });

  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + tax + shipping;

  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  shippingEl.textContent = shipping.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items before checking out.");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  const shipping = 5;
  const total = subtotal + tax + shipping;

  alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}`);

  // Clear cart
  cart = [];
  updateCartDisplay();
});

