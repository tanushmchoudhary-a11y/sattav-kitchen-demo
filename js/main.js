/**
 * SATTVA KITCHEN — Main Application Script
 * Handles global UI interactions, dynamic rendering for Menu and Home pages,
 * mobile drawer controls, search/filtering, and config data injection.
 */

document.addEventListener("DOMContentLoaded", () => {
  initGlobalUI();
  initMobileDrawer();
  
  // Page-specific initialization
  const page = document.body.dataset.page;
  if (page === "home") {
    initHomePage();
  } else if (page === "menu") {
    initMenuPage();
  } else if (page === "cart") {
    CheckoutEngine.init();
  } else if (page === "contact") {
    initContactPage();
  }
});

/**
 * Global UI bindings & config synchronization
 */
function initGlobalUI() {
  // Sync brand name across elements with data-bind="restaurant-name"
  document.querySelectorAll('[data-bind="restaurant-name"]').forEach(el => {
    el.textContent = RESTAURANT_CONFIG.name;
  });

  // Sync phone & WhatsApp numbers
  document.querySelectorAll('[data-bind="whatsapp-number"]').forEach(el => {
    el.textContent = RESTAURANT_CONFIG.whatsAppDisplayNumber;
  });

  document.querySelectorAll('[data-bind="restaurant-address"]').forEach(el => {
    el.textContent = RESTAURANT_CONFIG.address.fullAddress;
  });

  document.querySelectorAll('[data-bind="opening-hours"]').forEach(el => {
    el.textContent = `${RESTAURANT_CONFIG.openingHours.days}: ${RESTAURANT_CONFIG.openingHours.timings}`;
  });

  // Set direct WhatsApp links
  document.querySelectorAll('.js-whatsapp-link').forEach(link => {
    link.href = `https://wa.me/${RESTAURANT_CONFIG.whatsAppNumber}`;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  // Highlight active nav item
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link, .mobile-drawer-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/**
 * Mobile Drawer Menu controls
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const overlay = document.getElementById("mobile-nav-overlay");
  const drawer = document.getElementById("mobile-drawer");
  const closeBtn = document.getElementById("mobile-drawer-close");

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add("is-open");
    if (overlay) overlay.classList.add("is-open");
    toggleBtn.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    if (overlay) overlay.classList.remove("is-open");
    toggleBtn.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", () => {
    if (drawer.classList.contains("is-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  // Close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
}

/**
 * Home Page Logic
 */
function initHomePage() {
  // Render Cuisine Category Visual Tiles
  const categoriesGrid = document.getElementById("home-categories-grid");
  if (categoriesGrid && RESTAURANT_CONFIG.categories) {
    categoriesGrid.innerHTML = RESTAURANT_CONFIG.categories.map(cat => `
      <a href="menu.html?cat=${cat.id}" class="category-tile-card">
        <div class="cat-tile-badge">${cat.name}</div>
        <p class="cat-tile-desc">${cat.description}</p>
        <span class="cat-tile-link">Explore Dishes →</span>
      </a>
    `).join("");
  }

  // Render Curated Featured Dishes
  const featuredGrid = document.getElementById("home-featured-grid");
  if (featuredGrid && typeof MENU_ITEMS !== "undefined") {
    const featured = MENU_ITEMS.filter(item => item.isFeatured).slice(0, 6);
    featuredGrid.innerHTML = featured.map(dish => createDishCardHTML(dish)).join("");
  }
}

/**
 * Menu Page Logic: Category Filtering, Live Search, and Add to Cart
 */
function initMenuPage() {
  const grid = document.getElementById("menu-dishes-grid");
  const pillsContainer = document.getElementById("category-pills");
  const searchInput = document.getElementById("menu-search-input");
  const emptyState = document.getElementById("menu-empty-state");

  if (!grid) return;

  // Read URL query parameter for pre-filtered category if clicked from Home page
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get("cat") || "all";

  // Render Category Pills
  if (pillsContainer) {
    const allPill = `<button type="button" class="cat-pill ${activeCategory === 'all' ? 'active' : ''}" data-category="all">All Dishes</button>`;
    const categoryPills = RESTAURANT_CONFIG.categories.map(cat => `
      <button type="button" class="cat-pill ${activeCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
        ${cat.name}
      </button>
    `).join("");

    pillsContainer.innerHTML = allPill + categoryPills;

    // Attach click events
    pillsContainer.querySelectorAll(".cat-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        pillsContainer.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        activeCategory = pill.dataset.category;
        renderFilteredDishes();
      });
    });
  }

  // Live search input
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderFilteredDishes();
    });
  }

  function renderFilteredDishes() {
    const query = (searchInput?.value || "").toLowerCase().trim();
    const filtered = MENU_ITEMS.filter(dish => {
      const matchesCategory = activeCategory === "all" || dish.category === activeCategory;
      const matchesQuery = !query || 
        dish.name.toLowerCase().includes(query) || 
        dish.description.toLowerCase().includes(query) ||
        dish.categoryName.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
    } else {
      if (emptyState) emptyState.style.display = "none";
      grid.innerHTML = filtered.map(dish => createDishCardHTML(dish)).join("");
    }
  }

  // Initial render
  renderFilteredDishes();
}

/**
 * Contact Page Logic
 */
function initContactPage() {
  // Populate all address & timings fields cleanly
  const addressBlock = document.getElementById("contact-full-address");
  if (addressBlock) addressBlock.textContent = RESTAURANT_CONFIG.address.fullAddress;
}

/**
 * Helper: Generate HTML markup for a standard Food Card
 */
function createDishCardHTML(dish) {
  const tagBadge = dish.tags && dish.tags.length > 0 
    ? `<span class="dish-tag-badge">${escapeHTML(dish.tags[0])}</span>` 
    : "";

  return `
    <article class="dish-card" data-id="${dish.id}" data-category="${dish.category}">
      <div class="dish-image-wrap">
        <img src="${dish.image}" alt="${escapeHTML(dish.name)}" class="dish-image" loading="lazy">
        <span class="dish-category-pill">${escapeHTML(dish.categoryName)}</span>
        ${tagBadge}
      </div>
      <div class="dish-body">
        <div class="dish-header">
          <h3 class="dish-title">${escapeHTML(dish.name)}</h3>
          <span class="veg-indicator" title="Pure Vegetarian"></span>
        </div>
        <p class="dish-desc">${escapeHTML(dish.description)}</p>
        <div class="dish-footer">
          <div class="dish-price">${RESTAURANT_CONFIG.currency}${dish.price}</div>
          <button type="button" class="btn btn-primary btn-sm" onclick="CartManager.addItem('${dish.id}', 1)">
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  `;
}
