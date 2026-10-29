/**
 * SATTVA KITCHEN — Shopping Cart Engine
 * Manages client-side persistent cart state via localStorage with validation,
 * error resilience, cross-tab synchronization, and UI badge updates.
 */

const CART_STORAGE_KEY = "sattva_cart_v1";

const CartManager = {
  /**
   * Safe retrieval of cart items from localStorage
   * Handles corrupted data gracefully.
   */
  getCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
      }
      // Sanitize items: ensure valid id, positive integer quantity, and valid price
      return parsed.filter(item => 
        item && 
        typeof item.id === "string" && 
        Number.isInteger(item.quantity) && 
        item.quantity > 0 &&
        typeof item.price === "number" && 
        item.price >= 0
      );
    } catch (e) {
      console.warn("Sattva Kitchen: Error reading cart from localStorage. Resetting cart.", e);
      return [];
    }
  },

  /**
   * Persist cart array and notify system
   */
  saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      this.updateCartBadges();
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart } }));
    } catch (e) {
      console.error("Sattva Kitchen: Error saving cart to localStorage", e);
    }
  },

  /**
   * Add a dish by its ID to the cart
   */
  addItem(dishId, quantity = 1) {
    if (quantity <= 0) return;
    const dish = MENU_ITEMS.find(item => item.id === dishId);
    if (!dish) {
      console.error("Dish not found:", dishId);
      return;
    }

    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === dishId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: quantity,
        image: dish.image,
        category: dish.categoryName
      });
    }

    this.saveCart(cart);
    this.showToast(`Added ${dish.name} to cart`);
  },

  /**
   * Update quantity for an item in the cart.
   * If newQty <= 0, the item is removed.
   */
  updateQuantity(dishId, newQty) {
    let cart = this.getCart();
    if (newQty <= 0) {
      cart = cart.filter(item => item.id !== dishId);
      this.saveCart(cart);
      return;
    }

    const item = cart.find(i => i.id === dishId);
    if (item) {
      item.quantity = Math.floor(newQty);
      this.saveCart(cart);
    }
  },

  /**
   * Remove item entirely from cart
   */
  removeItem(dishId) {
    let cart = this.getCart();
    const target = cart.find(i => i.id === dishId);
    cart = cart.filter(item => item.id !== dishId);
    this.saveCart(cart);
    if (target) {
      this.showToast(`Removed ${target.name} from cart`);
    }
  },

  /**
   * Clear all cart contents
   */
  clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    this.updateCartBadges();
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart: [] } }));
  },

  /**
   * Calculate total item count (sum of quantities)
   */
  getTotalCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  },

  /**
   * Calculate cart subtotal in INR
   */
  getSubtotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  /**
   * Update all badge counters across the document
   */
  updateCartBadges() {
    const count = this.getTotalCount();
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    });
  },

  /**
   * Display non-intrusive feedback toast
   */
  showToast(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span class="toast-icon">✓</span>
      <span>${escapeHTML(message)}</span>
    `;
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
};

/**
 * XSS Helper
 */
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Keep cart counts in sync across multiple browser tabs
window.addEventListener("storage", (e) => {
  if (e.key === CART_STORAGE_KEY) {
    CartManager.updateCartBadges();
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart: CartManager.getCart() } }));
  }
});

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  CartManager.updateCartBadges();
});
