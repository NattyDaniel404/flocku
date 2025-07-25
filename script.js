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
  const eggSection = document.getElementById("eggSection");
  const contactSection = document.getElementById("contact")

  comicsTab.addEventListener("click", () => {
  comicsSection.style.display = "block";
  storeSection.style.display = "none";
  eggSection.style.display = "none";
  contactSection.style.display = "block";  
});

storeTab.addEventListener("click", () => {
  comicsSection.style.display = "none";
  storeSection.style.display = "block";
  eggSection.style.display = "none";
  contactSection.style.display = "none";
});

eggTab.addEventListener("click", () => {
  comicsSection.style.display = "none";
  storeSection.style.display = "none";
  eggSection.style.display = "block";
  contactSection.style.display = "none";
});



  // === COMIC NAVIGATION & CHAPTER DATA ===
  let currentChapter = "chapter1";
  let currentPage = 1;

  const chapterData = {
    chapter1: {
      title: "Chapter 1: The Beach",
      description: "After an intense heat day, the Flock Boys go to the beach.",
      pages: 4
    },
    chapter2: {
      title: "Chapter 2: The Talent Show",
      description: "The Flock Boys enter a wild talent show and chaos follows.",
      pages: 1
    }
  };

  const comicImg = document.querySelector("#ComicViewer img");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const chapterSelect = document.getElementById("chapterSelect");
  const chapterTitle = document.getElementById("chapterTitle");
  const chapterDescription = document.getElementById("chapterDescription");

  function updateComicPage() {
    const folder = currentChapter;
    const totalPages = chapterData[currentChapter].pages;

    comicImg.src = `images/${folder}/page${currentPage}.png`;
    comicImg.alt = `Comic Page ${currentPage} of ${chapterData[currentChapter].title}`;

    prevBtn.style.display = currentPage === 1 ? "none" : "inline-block";
    nextBtn.style.display = currentPage === totalPages ? "none" : "inline-block";
  }

  nextBtn.addEventListener("click", () => {
    if (currentPage < chapterData[currentChapter].pages) {
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
  const selectedOption = chapterSelect.options[chapterSelect.selectedIndex];
  currentChapter = selectedOption.value;
  currentPage = 1;

  // Update chapter title and description
  document.getElementById("chapterTitle").textContent = selectedOption.dataset.title;
  document.getElementById("chapterDescription").textContent = selectedOption.dataset.description;

  updateComicPage();
});


  // Initialize on load
  chapterTitle.textContent = chapterData[currentChapter].title;
  chapterDescription.textContent = chapterData[currentChapter].description;
  updateComicPage();

  // === FORM SUBMISSION & VALIDATION ===
  
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked');

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



// === EGG GAME ===

// === EGG GAME ===

let chickens = 1;
let eggs = 0;
let money = 0;
let farmers = 0;

let maxChickens = 5;
let eggsPerMinute = 1;

let eggProductionInterval = null;

// === DOM ===
const chickenCountSpan = document.getElementById("chickenCount");
const eggCountSpan = document.getElementById("eggCount");
const moneyCountSpan = document.getElementById("moneyCount");
const maxChickenCountSpan = document.getElementById("maxChickenCount");
const productionRateSpan = document.getElementById("productionRate");

const sellEggsButton = document.getElementById("sellEggsButton");
const buyCoopButton = document.getElementById("buyCoopButton");
const buyFarmerButton = document.getElementById("buyFarmerButton");

// === Egg Production Loop ===
function startEggProductionLoop() {
  if (eggProductionInterval) clearInterval(eggProductionInterval);

  const intervalTime = 60000 / eggsPerMinute; // ms per cycle

  eggProductionInterval = setInterval(() => {
    produceEggs();
  }, intervalTime);

  updateProductionRateDisplay();
}

function produceEggs() {
  let laid = chickens;

  for (let i = 0; i < laid; i++) {
    if (chickens < maxChickens && Math.random() > 0.5) {
      chickens++;
      logMessage("An egg hatched into a chicken!");
    } else {
      eggs++;
      logMessage("Egg produced!");
    }
  }

  updateDisplay();
}

// === Sell Eggs Button ===
function sellEggs() {
  if (eggs > 0) {
    money += eggs;
    logMessage(`Sold ${eggs} eggs for $${eggs}.`);
    eggs = 0;
    updateDisplay();
  } else {
    logMessage("No eggs to sell!");
  }
}
sellEggsButton.addEventListener("click", sellEggs);

// === Buy Coop Button ===
function buyCoop() {
  if (money >= 100) {
    money -= 100;
    maxChickens += 5;
    logMessage("Bought a new coop! Max chickens increased.");
    updateDisplay();
  } else {
    logMessage("Not enough money to buy a coop!");
  }
}
buyCoopButton.addEventListener("click", buyCoop);

// === Buy Farmer Button ===
function buyFarmer() {
  if (money >= 500) {
    money -= 500;
    farmers++;
    increaseProduction();
    logMessage("Hired a new farmer!");
    updateDisplay();
  } else {
    alert("Not enough money to hire a farmer!");
  }
}
buyFarmerButton.addEventListener("click", buyFarmer);

function increaseProduction() {
  eggsPerMinute = 1 + farmers;
  startEggProductionLoop();
}

// === Display Updates ===
function updateDisplay() {
  chickenCountSpan.textContent = chickens;
  eggCountSpan.textContent = eggs;
  moneyCountSpan.textContent = money;
  maxChickenCountSpan.textContent = maxChickens;
  updateProductionRateDisplay();
}

function updateProductionRateDisplay() {
  productionRateSpan.textContent = `Eggs per Minute: ${eggsPerMinute}`;
}

function logMessage(message) {
  console.log(message);
}

// === Start Production ===
startEggProductionLoop();
updateDisplay();
