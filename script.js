// Nostra - shared JS (product data, search/filter, nav toggle, contact form)

const PRODUCTS = [
  { id: 1, name: "Classic Trench Coat", category: "Women", price: 189.0, image: "https://picsum.photos/seed/trench/400/400" },
  { id: 2, name: "Linen Button Shirt", category: "Men", price: 59.0, image: "https://picsum.photos/seed/linen-shirt/400/400" },
  { id: 3, name: "Leather Crossbody Bag", category: "Accessories", price: 115.0, image: "https://picsum.photos/seed/crossbody/400/400" },
  { id: 4, name: "Wool Blend Overcoat", category: "Men", price: 220.0, image: "https://picsum.photos/seed/overcoat/400/400" },
  { id: 5, name: "Silk Midi Dress", category: "Women", price: 145.0, image: "https://picsum.photos/seed/midi-dress/400/400" },
  { id: 6, name: "Minimalist Watch", category: "Accessories", price: 98.0, image: "https://picsum.photos/seed/watch/400/400" },
  { id: 7, name: "Tailored Trousers", category: "Men", price: 75.0, image: "https://picsum.photos/seed/trousers/400/400" },
  { id: 8, name: "Cashmere Scarf", category: "Accessories", price: 65.0, image: "https://picsum.photos/seed/scarf/400/400" },
  { id: 9, name: "Pleated Skirt", category: "Women", price: 69.0, image: "https://picsum.photos/seed/pleated-skirt/400/400" },
  { id: 10, name: "Denim Jacket", category: "Women", price: 89.0, image: "https://picsum.photos/seed/denim-jacket/400/400" },
  { id: 11, name: "Leather Belt", category: "Accessories", price: 45.0, image: "https://picsum.photos/seed/belt/400/400" },
  { id: 12, name: "Knit Sweater", category: "Men", price: 79.0, image: "https://picsum.photos/seed/sweater/400/400" },
];

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function renderProducts(products, gridEl) {
  if (!gridEl) return;

  if (products.length === 0) {
    gridEl.innerHTML = "";
    gridEl.insertAdjacentHTML(
      "afterend",
      '<p class="empty-state" data-empty-state>No products match your search.</p>'
    );
    return;
  }

  const existingEmpty = gridEl.parentElement.querySelector("[data-empty-state]");
  if (existingEmpty) existingEmpty.remove();

  gridEl.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3>${product.name}</h3>
            <span class="product-price">${formatPrice(product.price)}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function initCollectionsPage() {
  const grid = document.querySelector("[data-product-grid]");
  if (!grid) return;

  const searchInput = document.querySelector("[data-search-input]");
  const filterButtons = document.querySelectorAll("[data-filter-btn]");

  let activeCategory = "All";
  let searchTerm = "";

  function applyFilters() {
    const filtered = PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    renderProducts(filtered, grid);
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      searchTerm = event.target.value;
      applyFilters();
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      activeCategory = btn.dataset.filterBtn;
      applyFilters();
    });
  });

  applyFilters();
}

function initNavToggle() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const messageInput = form.querySelector("#message");
  const successMessage = form.querySelector("[data-form-message]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;

    const nameError = form.querySelector('[data-error-for="name"]');
    const emailError = form.querySelector('[data-error-for="email"]');
    const messageError = form.querySelector('[data-error-for="message"]');

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.classList.remove("visible");

    if (nameInput.value.trim().length === 0) {
      nameError.textContent = "Please enter your name.";
      valid = false;
    }

    if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message should be at least 10 characters.";
      valid = false;
    }

    if (valid) {
      successMessage.textContent = "Thanks! Your message has been sent.";
      successMessage.classList.add("visible");
      form.reset();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initCollectionsPage();
  initContactForm();
});
