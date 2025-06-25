"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // === THEME TOGGLE ===
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  toggle.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
  });

  // === TAB NAVIGATION ===
  const comicsTab = document.getElementById("comicsTab");
  const storeTab = document.getElementById("storeTab");
  const comicsSection = document.getElementById("comicsSection");
  const storeSection = document.getElementById("storeSection");

  comicsTab.addEventListener("click", () => {
    comicsSection.style.display = "block";
    storeSection.style.display = "none";
  });

  storeTab.addEventListener("click", () => {
    comicsSection.style.display = "none";
    storeSection.style.display = "block";
  });

let currentChapter = "chapter1";
let currentPage = 1;

const chapterPages = {
  chapter1: 4, //amount of pages on chapter 1
  chapter2: 0, // amount of pages on chapter 2
};

const comicImg = document.querySelector("#ComicViewer img");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const chapterSelect = document.getElementById("chapterSelect");

function updateComicPage() {
  const totalPages = chapterPages[currentChapter];
  comicImg.src = `images/${currentChapter}/page${currentPage}.png`;
  comicImg.alt = `Comic Page ${currentPage} of ${currentChapter}`;
  prevBtn.style.display = currentPage === 1 ? "none" : "inline-block";
  nextBtn.style.display = currentPage === totalPages ? "none" : "inline-block";
}

nextBtn.addEventListener("click", () => {
  const totalPages = chapterPages[currentChapter];
  if (currentPage < totalPages) {
    currentPage++;
    updateComicPage();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateComicPage();
  }
});

chapterSelect.addEventListener("change", () => {
  currentChapter = chapterSelect.value === "Chapter 2: The Talent Show" ? "chapter2" : "chapter1";
  currentPage = 1;
  updateComicPage();
});


// Event listener for Next Page
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    updateComicPage();
  }
});

// Event listener for Previous Page
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateComicPage();
  }
});

// Initialize viewer on load
updateComicPage();


  // === FORM SUBMISSION & VALIDATION ===
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked');

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    
    let valid = true;

    if (!fullName) {
      document.getElementById("nameError").textContent = "Name is required.";
      valid = false;
    }

    if (!comments) {
      document.getElementById("commentsError").textContent = "Comment is required.";
      valid = false;
    }

    if (!contactMethod) {
      alert("Please select a contact method.");
      valid = false;
    } else if (contactMethod.value === "email" && !email) {
      document.getElementById("emailError").textContent = "Email is required for this contact method.";
      valid = false;
    } else if (contactMethod.value === "phone" && !phone) {
      document.getElementById("phoneError").textContent = "Phone is required for this contact method.";
      valid = false;
    }

    if (!valid) return;

    // Create object
    const customer = {
      name: fullName,
      phone: phone,
      email: email,
      comments: comments,
      preferredContact: contactMethod.value
    };

    successMessage.innerHTML = `<p>Thank you, ${customer.name}! We'll contact you by ${customer.preferredContact} for chapter updates!</p>`;
    form.reset();
  });

  // === SHOPPING CART ===
  const products = {
    book: { name: "Comic Book", price: 15.0 },
    print: { name: "Art Print", price: 5.0 },
    sticker: { name: "Sticker Pack", price: 4.0 }
  };

  const cart = [];

  const cartItemsEl = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  function updateCart() {
    cartItemsEl.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartItemsEl.appendChild(li);
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

  document.querySelectorAll("button[data-product]").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.dataset.product;
      cart.push(products[key]);
      updateCart();
    });
  });

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const total = totalEl.textContent;
    alert(`Thank you for your order! Your total is $${total}.`);

    cart.length = 0;
    updateCart();
  });
});
