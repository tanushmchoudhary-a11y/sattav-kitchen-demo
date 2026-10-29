/**
 * SATTVA KITCHEN — Checkout & WhatsApp Order Engine
 * Handles order validation, Delivery vs Takeaway toggling, order summary calculations,
 * and compiles the prefilled WhatsApp message conforming to the restaurant format.
 */

const CheckoutEngine = {
  selectedOrderType: "delivery", // 'delivery' or 'takeaway'

  init() {
    this.bindOrderTypeToggle();
    this.renderCartItemsList();
    this.renderOrderCalculation();
    this.bindFormSubmit();

    // Listen for cart changes
    window.addEventListener("cart:updated", () => {
      this.renderCartItemsList();
      this.renderOrderCalculation();
    });
  },

  /**
   * Switch between Delivery and Takeaway
   */
  bindOrderTypeToggle() {
    const deliveryBtn = document.getElementById("type-delivery-btn");
    const takeawayBtn = document.getElementById("type-takeaway-btn");
    const deliveryFields = document.getElementById("delivery-fields-wrap");
    const paymentNotice = document.getElementById("payment-notice-text");

    if (!deliveryBtn || !takeawayBtn) return;

    deliveryBtn.addEventListener("click", () => {
      this.selectedOrderType = "delivery";
      deliveryBtn.classList.add("active");
      takeawayBtn.classList.remove("active");
      if (deliveryFields) deliveryFields.style.display = "block";
      if (paymentNotice) {
        paymentNotice.innerHTML = `
          <h4>Cash on Delivery (COD)</h4>
          <p>Pay cash when your freshly prepared food reaches your doorstep. Please keep exact change ready.</p>
        `;
      }
      this.renderOrderCalculation();
    });

    takeawayBtn.addEventListener("click", () => {
      this.selectedOrderType = "takeaway";
      takeawayBtn.classList.add("active");
      deliveryBtn.classList.remove("active");
      if (deliveryFields) deliveryFields.style.display = "none";
      if (paymentNotice) {
        paymentNotice.innerHTML = `
          <h4>Pay on Pickup</h4>
          <p>Collect your package directly from our kitchen counter at <strong>${RESTAURANT_CONFIG.address.street}, ${RESTAURANT_CONFIG.address.locality}</strong>. Pay via cash or UPI at the counter.</p>
        `;
      }
      this.renderOrderCalculation();
    });
  },

  /**
   * Render cart items list inside the checkout page
   */
  renderCartItemsList() {
    const container = document.getElementById("cart-items-container");
    const emptyState = document.getElementById("cart-empty-state");
    const checkoutGrid = document.getElementById("checkout-grid-wrap");

    if (!container) return;

    const cart = CartManager.getCart();

    if (cart.length === 0) {
      if (emptyState) emptyState.style.display = "block";
      if (checkoutGrid) checkoutGrid.style.display = "none";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (checkoutGrid) checkoutGrid.style.display = "grid";

    let html = "";
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      html += `
        <div class="cart-item-row" data-id="${item.id}">
          <img src="${item.image}" alt="${escapeHTML(item.name)}" class="cart-item-img" loading="lazy">
          <div class="cart-item-info">
            <div class="cart-item-name">
              <span class="veg-indicator" title="Pure Vegetarian"></span>
              <span>${escapeHTML(item.name)}</span>
            </div>
            <div class="cart-item-unit-price">${RESTAURANT_CONFIG.currency}${item.price} each</div>
          </div>
          <div class="qty-stepper">
            <button type="button" class="qty-btn" onclick="CartManager.updateQuantity('${item.id}', ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button type="button" class="qty-btn" onclick="CartManager.updateQuantity('${item.id}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
          </div>
          <div class="cart-item-total">${RESTAURANT_CONFIG.currency}${itemTotal}</div>
          <button type="button" class="cart-remove-btn" onclick="CartManager.removeItem('${item.id}')" aria-label="Remove item" title="Remove">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  /**
   * Render financial calculation breakdown
   */
  renderOrderCalculation() {
    const subtotal = CartManager.getSubtotal();
    const subtotalEl = document.getElementById("calc-subtotal");
    const deliveryFeeEl = document.getElementById("calc-delivery-fee");
    const totalEl = document.getElementById("calc-total");

    if (subtotalEl) {
      subtotalEl.textContent = `${RESTAURANT_CONFIG.currency}${subtotal}`;
    }

    if (deliveryFeeEl) {
      if (this.selectedOrderType === "takeaway") {
        deliveryFeeEl.textContent = "₹0 (Self-Pickup)";
      } else {
        deliveryFeeEl.textContent = "To be confirmed";
      }
    }

    if (totalEl) {
      if (this.selectedOrderType === "takeaway") {
        totalEl.textContent = `${RESTAURANT_CONFIG.currency}${subtotal}`;
      } else {
        totalEl.textContent = `${RESTAURANT_CONFIG.currency}${subtotal} + Delivery`;
      }
    }
  },

  /**
   * Validate checkout inputs and compile WhatsApp message
   */
  bindFormSubmit() {
    const form = document.getElementById("checkout-form");
    const errorBox = document.getElementById("checkout-error-box");
    const fallbackBox = document.getElementById("whatsapp-fallback-box");

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (errorBox) {
        errorBox.style.display = "none";
        errorBox.textContent = "";
      }
      if (fallbackBox) {
        fallbackBox.style.display = "none";
      }

      const cart = CartManager.getCart();
      if (cart.length === 0) {
        this.showError("Your cart is empty. Please add items before checking out.");
        return;
      }

      const name = (document.getElementById("cust-name")?.value || "").trim();
      const phone = (document.getElementById("cust-phone")?.value || "").trim();
      const address = (document.getElementById("cust-address")?.value || "").trim();
      const locality = (document.getElementById("cust-locality")?.value || "").trim();
      const landmark = (document.getElementById("cust-landmark")?.value || "").trim();
      const instructions = (document.getElementById("cust-instructions")?.value || "").trim();

      // Validation
      if (!name) {
        this.showError("Please enter your name.");
        document.getElementById("cust-name")?.focus();
        return;
      }

      // 10-digit Indian phone number check (allows optional leading 0 or +91)
      const cleanPhone = phone.replace(/[^0-9]/g, "");
      if (cleanPhone.length < 10) {
        this.showError("Please enter a valid 10-digit mobile number.");
        document.getElementById("cust-phone")?.focus();
        return;
      }

      if (this.selectedOrderType === "delivery") {
        if (!address) {
          this.showError("Please enter your complete delivery address.");
          document.getElementById("cust-address")?.focus();
          return;
        }
        if (!locality) {
          this.showError("Please enter your area or locality.");
          document.getElementById("cust-locality")?.focus();
          return;
        }
      }

      // Compile message matching required specification
      const message = this.buildWhatsAppMessage({
        name,
        phone,
        orderType: this.selectedOrderType === "delivery" ? "Delivery" : "Takeaway / Pickup",
        paymentMethod: this.selectedOrderType === "delivery" ? "Cash on Delivery" : "Pay on Pickup",
        address,
        locality,
        landmark,
        instructions,
        cart,
        subtotal: CartManager.getSubtotal()
      });

      const encoded = encodeURIComponent(message);
      const waURL = `https://wa.me/${RESTAURANT_CONFIG.whatsAppNumber}?text=${encoded}`;

      // Open WhatsApp link
      const opened = window.open(waURL, "_blank");

      // Show fallback link and instructions dialog
      const modal = document.getElementById("order-instruction-modal");
      const modalLink = document.getElementById("modal-wa-fallback-link");
      if (modal) {
        if (modalLink) modalLink.href = waURL;
        modal.style.display = "flex";
      } else if (!opened || opened.closed || typeof opened.closed === "undefined") {
        // Fallback banner if popups blocked
        if (fallbackBox) {
          fallbackBox.innerHTML = `
            <p>If WhatsApp didn't open automatically, please click below:</p>
            <a href="${waURL}" target="_blank" class="btn btn-whatsapp btn-sm" style="margin-top: 0.5rem;">
              Open WhatsApp Now
            </a>
          `;
          fallbackBox.style.display = "block";
        }
      }
    });
  },

  /**
   * Build clean, structured WhatsApp text message
   */
  buildWhatsAppMessage(data) {
    let lines = [];
    lines.push(`NEW ORDER — ${RESTAURANT_CONFIG.name.toUpperCase()}`);
    lines.push(`Customer: ${data.name}`);
    lines.push(`Phone: ${data.phone}`);
    lines.push(`Order Type: ${data.orderType}`);
    lines.push(`Payment: ${data.paymentMethod}`);
    lines.push(``);
    lines.push(`ORDER ITEMS`);

    data.cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      lines.push(`${item.name}`);
      lines.push(`Qty: ${item.quantity}`);
      lines.push(`Unit Price: ${RESTAURANT_CONFIG.currency}${item.price}`);
      lines.push(`Total: ${RESTAURANT_CONFIG.currency}${itemTotal}`);
      lines.push(``);
    });

    lines.push(`ORDER SUMMARY`);
    lines.push(`Subtotal: ${RESTAURANT_CONFIG.currency}${data.subtotal}`);
    
    if (this.selectedOrderType === "delivery") {
      lines.push(`Delivery Charges: To be confirmed`);
      lines.push(`Final Payable Amount: To be confirmed by restaurant`);
      lines.push(``);
      lines.push(`DELIVERY DETAILS`);
      lines.push(`Address: ${data.address}`);
      lines.push(`Area: ${data.locality}`);
      if (data.landmark) lines.push(`Landmark: ${data.landmark}`);
      if (data.instructions) lines.push(`Instructions: ${data.instructions}`);
    } else {
      lines.push(`Delivery Charges: ₹0 (Self-Pickup)`);
      lines.push(`Final Payable Amount: ${RESTAURANT_CONFIG.currency}${data.subtotal}`);
      lines.push(``);
      lines.push(`PICKUP DETAILS`);
      lines.push(`Pickup Counter: ${RESTAURANT_CONFIG.name}, ${RESTAURANT_CONFIG.address.street}`);
      if (data.instructions) lines.push(`Notes: ${data.instructions}`);
    }

    lines.push(``);
    lines.push(`Please confirm the order, delivery availability, and final payable amount.`);

    return lines.join("\n");
  },

  showError(msg) {
    const errorBox = document.getElementById("checkout-error-box");
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.style.display = "block";
      errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      alert(msg);
    }
  }
};
