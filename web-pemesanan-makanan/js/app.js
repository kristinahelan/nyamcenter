/**
 * SAVORIA BITES & BISTRO - FRONTEND APPLICATION CORE
 * Handles State, Menu Rendering, Customization Modals, Slide-over Cart,
 * Discounts, Checkout, QRIS Mockup, and Real-Time Order Tracking Stepper.
 */

// Global Application State
const AppState = {
  cart: [],
  favorites: [],
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'popular',
  filterPromo: false,
  filterBestSeller: false,
  appliedVoucher: null,
  orderType: 'delivery', // 'delivery' | 'dinein' | 'takeaway'
  currentActiveItem: null, // item being customized in modal
  modalSelection: {
    portion: null,
    spicyLevel: null,
    toppings: [],
    notes: '',
    quantity: 1
  },
  activeOrder: null,
  trackerStep: 1,
  trackerInterval: null,
  qrisCountdownInterval: null
};

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadStoredData();
  renderCategories();
  renderVouchersQuickBar();
  renderMenuGrid();
  updateCartUI();
  updateFavoritesUI();
  attachEventListeners();
});

// ================= LOCAL STORAGE HELPERS =================
function loadStoredData() {
  try {
    const savedCart = localStorage.getItem('savoria_cart');
    if (savedCart) AppState.cart = JSON.parse(savedCart);

    const savedFavs = localStorage.getItem('savoria_favs');
    if (savedFavs) AppState.favorites = JSON.parse(savedFavs);

    const savedOrderType = localStorage.getItem('savoria_ordertype');
    if (savedOrderType) AppState.orderType = savedOrderType;
    updateOrderTypeBadgeUI();
  } catch (err) {
    console.error('Error loading localStorage:', err);
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('savoria_cart', JSON.stringify(AppState.cart));
  } catch (err) {
    console.error('Error saving cart:', err);
  }
}

function saveFavoritesToStorage() {
  try {
    localStorage.setItem('savoria_favs', JSON.stringify(AppState.favorites));
  } catch (err) {
    console.error('Error saving favorites:', err);
  }
}

// ================= THEME TOGGLE =================
function initTheme() {
  const savedTheme = localStorage.getItem('savoria_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('savoria_theme', next);
      showToast(`Mode ${next === 'dark' ? 'Gelap 🌙' : 'Terang ☀️'} diaktifkan`);
    });
  }
}

// ================= FORMAT CURRENCY =================
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

// ================= RENDER CATEGORIES =================
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  container.innerHTML = MENU_CATEGORIES.map(cat => `
    <button 
      class="category-chip ${cat.id === AppState.activeCategory ? 'active' : ''}" 
      data-category-id="${cat.id}"
      role="tab"
      aria-selected="${cat.id === AppState.activeCategory}"
    >
      <span class="cat-icon">${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('.category-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-category-id');
      AppState.activeCategory = catId;
      container.querySelectorAll('.category-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenuGrid();
    });
  });
}

// ================= RENDER QUICK VOUCHERS BAR =================
function renderVouchersQuickBar() {
  const container = document.getElementById('vouchers-quick-list');
  if (!container) return;

  container.innerHTML = PROMO_VOUCHERS.map(v => `
    <div class="voucher-card" data-voucher-code="${v.code}" title="Klik untuk pakai kupon ${v.code}">
      <span class="voucher-icon">🎟️</span>
      <div class="voucher-details">
        <span class="voucher-code-chip">${v.code}</span>
        <div class="voucher-title">${v.title}</div>
        <div class="voucher-desc">${v.description}</div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.voucher-card').forEach(card => {
    card.addEventListener('click', () => {
      const code = card.getAttribute('data-voucher-code');
      applyVoucherCode(code, true);
    });
  });
}

// ================= RENDER MENU GRID =================
function renderMenuGrid() {
  const container = document.getElementById('menu-grid');
  const emptyState = document.getElementById('empty-state');
  if (!container) return;

  // Filter items
  let items = MENU_ITEMS.filter(item => {
    // Category filter
    if (AppState.activeCategory !== 'all' && item.category !== AppState.activeCategory) {
      return false;
    }
    // Search query filter
    if (AppState.searchQuery.trim() !== '') {
      const q = AppState.searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    // Promo filter
    if (AppState.filterPromo && !item.isPromo) return false;
    // Best Seller filter
    if (AppState.filterBestSeller && !item.isBestSeller) return false;

    return true;
  });

  // Sort items
  items.sort((a, b) => {
    if (AppState.sortBy === 'rating') return b.rating - a.rating;
    if (AppState.sortBy === 'price-asc') return a.price - b.price;
    if (AppState.sortBy === 'price-desc') return b.price - a.price;
    // default: popular
    return b.reviewsCount - a.reviewsCount;
  });

  if (items.length === 0) {
    container.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  container.style.display = 'grid';
  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = items.map(item => {
    const isFav = AppState.favorites.includes(item.id);
    const hasDiscount = item.originalPrice && item.originalPrice > item.price;
    const discountPct = hasDiscount ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;

    return `
      <div class="menu-card" data-item-id="${item.id}">
        <div class="menu-card-img-wrap">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="menu-card-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';"
          >
          <div class="menu-card-badges">
            ${item.isBestSeller ? '<span class="card-badge bestseller">🔥 Best Seller</span>' : ''}
            ${hasDiscount ? `<span class="card-badge promo">Diskon ${discountPct}%</span>` : ''}
            ${item.spicyLevel > 0 ? `<span class="card-badge spicy">🌶️ Lvl ${item.spicyLevel}</span>` : ''}
          </div>

          <button 
            class="card-fav-btn ${isFav ? 'is-favorite' : ''}" 
            data-item-id="${item.id}" 
            title="${isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}"
            aria-label="Favorit"
          >
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        <div class="menu-card-body">
          <div class="menu-meta-row">
            <span class="menu-rating">⭐ ${item.rating.toFixed(1)} (${item.reviewsCount}+)</span>
            <span class="menu-preptime">⏱️ ${item.prepTime}</span>
          </div>

          <h3 class="menu-card-title">${item.name}</h3>
          <p class="menu-card-desc">${item.description}</p>

          <div class="menu-card-footer">
            <div class="price-container">
              <span class="price-main">${formatRupiah(item.price)}</span>
              ${hasDiscount ? `<span class="price-strike">${formatRupiah(item.originalPrice)}</span>` : ''}
            </div>

            <button class="btn-add-item open-custom-btn" data-item-id="${item.id}">
              <span>+ Pesan</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach card event listeners
  container.querySelectorAll('.open-custom-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = btn.getAttribute('data-item-id');
      openCustomizationModal(itemId);
    });
  });

  // Clicking anywhere on card also opens customizer
  container.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-fav-btn') || e.target.closest('.open-custom-btn')) return;
      const itemId = card.getAttribute('data-item-id');
      openCustomizationModal(itemId);
    });
  });

  // Favorite button
  container.querySelectorAll('.card-fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = btn.getAttribute('data-item-id');
      toggleFavorite(itemId);
    });
  });
}

// ================= FAVORITES =================
function toggleFavorite(itemId) {
  const index = AppState.favorites.indexOf(itemId);
  const item = MENU_ITEMS.find(i => i.id === itemId);

  if (index > -1) {
    AppState.favorites.splice(index, 1);
    showToast(`"${item.name}" dihapus dari favorit`, 'info');
  } else {
    AppState.favorites.push(itemId);
    showToast(`❤️ "${item.name}" disimpan ke favorit!`, 'success');
  }

  saveFavoritesToStorage();
  updateFavoritesUI();
  renderMenuGrid();
}

function updateFavoritesUI() {
  const badge = document.getElementById('wishlist-badge');
  if (!badge) return;

  const count = AppState.favorites.length;
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// ================= CUSTOMIZATION MODAL =================
function openCustomizationModal(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  AppState.currentActiveItem = item;
  AppState.modalSelection = {
    portion: item.options.portions[0],
    spicyLevel: item.options.spicyLevels ? item.options.spicyLevels[0] : null,
    toppings: [],
    notes: '',
    quantity: 1
  };

  // Bind static details
  document.getElementById('modal-menu-img').src = item.image;
  document.getElementById('modal-menu-title').textContent = item.name;
  document.getElementById('modal-menu-desc').textContent = item.description;
  document.getElementById('modal-menu-category').textContent = item.category.toUpperCase().replace('-', ' ');
  document.getElementById('modal-menu-rating').textContent = `⭐ ${item.rating.toFixed(1)}`;
  document.getElementById('modal-prep-time').textContent = `⏱️ ${item.prepTime}`;
  document.getElementById('modal-base-price').textContent = formatRupiah(item.price);

  const oldPriceEl = document.getElementById('modal-old-price');
  if (item.originalPrice && item.originalPrice > item.price) {
    oldPriceEl.textContent = formatRupiah(item.originalPrice);
    oldPriceEl.style.display = 'inline';
  } else {
    oldPriceEl.style.display = 'none';
  }

  document.getElementById('modal-notes-input').value = '';
  document.getElementById('modal-qty-display').textContent = '1';

  // Render Portion Options
  const portionContainer = document.getElementById('portion-options-container');
  portionContainer.innerHTML = item.options.portions.map((p, idx) => `
    <label class="option-row ${idx === 0 ? 'selected' : ''}">
      <div class="option-label-wrap">
        <input type="radio" name="portionOption" value="${p.name}" ${idx === 0 ? 'checked' : ''}>
        <span>${p.name}</span>
      </div>
      <span class="option-extra-price">${p.extra > 0 ? `+${formatRupiah(p.extra)}` : 'Gratis'}</span>
    </label>
  `).join('');

  portionContainer.querySelectorAll('input[name="portionOption"]').forEach((radio, idx) => {
    radio.addEventListener('change', () => {
      portionContainer.querySelectorAll('.option-row').forEach(row => row.classList.remove('selected'));
      radio.closest('.option-row').classList.add('selected');
      AppState.modalSelection.portion = item.options.portions[idx];
      updateModalAddPrice();
    });
  });

  // Render Spicy / Variant Options
  const spicySection = document.getElementById('spicy-section');
  const spicyContainer = document.getElementById('spicy-options-container');
  if (item.options.spicyLevels && item.options.spicyLevels.length > 0) {
    spicySection.style.display = 'block';
    spicyContainer.innerHTML = item.options.spicyLevels.map((s, idx) => `
      <label class="option-row ${idx === 0 ? 'selected' : ''}">
        <div class="option-label-wrap">
          <input type="radio" name="spicyOption" value="${s}" ${idx === 0 ? 'checked' : ''}>
          <span>${s}</span>
        </div>
      </label>
    `).join('');

    spicyContainer.querySelectorAll('input[name="spicyOption"]').forEach(radio => {
      radio.addEventListener('change', () => {
        spicyContainer.querySelectorAll('.option-row').forEach(row => row.classList.remove('selected'));
        radio.closest('.option-row').classList.add('selected');
        AppState.modalSelection.spicyLevel = radio.value;
      });
    });
  } else {
    spicySection.style.display = 'none';
    AppState.modalSelection.spicyLevel = null;
  }

  // Render Topping Options
  const toppingSection = document.getElementById('topping-section');
  const toppingContainer = document.getElementById('topping-options-container');
  if (item.options.toppings && item.options.toppings.length > 0) {
    toppingSection.style.display = 'block';
    toppingContainer.innerHTML = item.options.toppings.map(top => `
      <label class="option-row">
        <div class="option-label-wrap">
          <input type="checkbox" name="toppingOption" value="${top.id}">
          <span>${top.name}</span>
        </div>
        <span class="option-extra-price">+${formatRupiah(top.price)}</span>
      </label>
    `).join('');

    toppingContainer.querySelectorAll('input[name="toppingOption"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const row = checkbox.closest('.option-row');
        row.classList.toggle('selected', checkbox.checked);

        const checkedIds = Array.from(toppingContainer.querySelectorAll('input[name="toppingOption"]:checked'))
          .map(cb => cb.value);

        AppState.modalSelection.toppings = item.options.toppings.filter(t => checkedIds.includes(t.id));
        updateModalAddPrice();
      });
    });
  } else {
    toppingSection.style.display = 'none';
  }

  updateModalAddPrice();

  // Show Modal
  const modal = document.getElementById('custom-modal-backdrop');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeCustomizationModal() {
  const modal = document.getElementById('custom-modal-backdrop');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function updateModalAddPrice() {
  if (!AppState.currentActiveItem) return;
  const basePrice = AppState.currentActiveItem.price;
  const portionExtra = AppState.modalSelection.portion ? AppState.modalSelection.portion.extra : 0;
  const toppingsTotal = AppState.modalSelection.toppings.reduce((sum, t) => sum + t.price, 0);

  const unitPrice = basePrice + portionExtra + toppingsTotal;
  const totalPrice = unitPrice * AppState.modalSelection.quantity;

  const totalEl = document.getElementById('modal-total-add-price');
  if (totalEl) totalEl.textContent = formatRupiah(totalPrice);
}

// Add configured item from modal to cart
function confirmAddToCart() {
  if (!AppState.currentActiveItem) return;

  const item = AppState.currentActiveItem;
  const portion = AppState.modalSelection.portion;
  const spicy = AppState.modalSelection.spicyLevel;
  const toppings = AppState.modalSelection.toppings;
  const notes = document.getElementById('modal-notes-input').value.trim();
  const quantity = AppState.modalSelection.quantity;

  const basePrice = item.price;
  const portionExtra = portion ? portion.extra : 0;
  const toppingsExtra = toppings.reduce((sum, t) => sum + t.price, 0);
  const unitPrice = basePrice + portionExtra + toppingsExtra;

  // Create unique signature key for exact configuration
  const toppingKey = toppings.map(t => t.id).sort().join('_');
  const signature = `${item.id}-${portion ? portion.name : ''}-${spicy || ''}-${toppingKey}-${notes}`;

  const existingIdx = AppState.cart.findIndex(c => c.signature === signature);

  if (existingIdx > -1) {
    AppState.cart[existingIdx].quantity += quantity;
  } else {
    AppState.cart.push({
      signature,
      itemId: item.id,
      name: item.name,
      image: item.image,
      unitPrice,
      portionName: portion ? portion.name : '',
      spicyLevel: spicy,
      toppings,
      notes,
      quantity
    });
  }

  saveCartToStorage();
  updateCartUI();
  closeCustomizationModal();
  showToast(`🍲 ${quantity}x "${item.name}" berhasil masuk ke keranjang!`, 'success');
}

// ================= SLIDE-OVER CART =================
function openCartDrawer() {
  const drawerBackdrop = document.getElementById('cart-backdrop');
  drawerBackdrop.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  renderCartDrawerItems();
  calculateCartTotals();
}

function closeCartDrawer() {
  const drawerBackdrop = document.getElementById('cart-backdrop');
  drawerBackdrop.style.display = 'none';
  document.body.style.overflow = '';
}

function updateCartUI() {
  // Total quantity
  const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  // Update navbar cart badge & price
  const navBadge = document.getElementById('cart-badge');
  const navPrice = document.getElementById('cart-nav-price');
  if (navBadge) navBadge.textContent = totalItems;
  if (navPrice) navPrice.textContent = formatRupiah(subtotal);

  // Update mobile floating cart
  const mFloat = document.getElementById('mobile-floating-cart');
  const mCount = document.getElementById('m-cart-count');
  const mTotal = document.getElementById('m-cart-total');
  if (mFloat) {
    if (totalItems > 0) {
      mFloat.style.display = 'block';
      if (mCount) mCount.textContent = `${totalItems} Item`;
      if (mTotal) mTotal.textContent = formatRupiah(subtotal);
    } else {
      mFloat.style.display = 'none';
    }
  }

  // Update drawer count
  const drawerCount = document.getElementById('drawer-item-count');
  if (drawerCount) drawerCount.textContent = `${totalItems} item`;

  renderCartDrawerItems();
  calculateCartTotals();
}

function renderCartDrawerItems() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (AppState.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">🛒</div>
        <h4>Keranjang Masih Kosong</h4>
        <p>Yuk pilih aneka menu lezat Savoria favoritmu sekarang!</p>
        <button class="btn btn-secondary btn-xs" style="margin-top: 1rem;" onclick="closeCartDrawer()">Mulai Pesan</button>
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.cart.map((cartItem, idx) => {
    const toppingsText = cartItem.toppings.length > 0
      ? `+ Topping: ${cartItem.toppings.map(t => t.name).join(', ')}`
      : '';
    const spicyText = cartItem.spicyLevel ? `🌶️ ${cartItem.spicyLevel}` : '';
    const portionText = cartItem.portionName ? `📦 ${cartItem.portionName}` : '';
    const notesText = cartItem.notes ? `📝 "${cartItem.notes}"` : '';

    const detailsArr = [portionText, spicyText, toppingsText, notesText].filter(Boolean);

    return `
      <div class="cart-item-row" data-cart-index="${idx}">
        <img 
          src="${cartItem.image}" 
          alt="${cartItem.name}" 
          class="cart-item-img"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';"
        >
        <div class="cart-item-info">
          <div class="cart-item-top">
            <h4 class="cart-item-name">${cartItem.name}</h4>
            <button class="cart-item-remove" data-cart-index="${idx}" title="Hapus menu">✕</button>
          </div>

          ${detailsArr.length > 0 ? `<div class="cart-item-customs">${detailsArr.join('<br>')}</div>` : ''}

          <div class="cart-item-bottom">
            <span class="cart-item-price">${formatRupiah(cartItem.unitPrice * cartItem.quantity)}</span>
            <div class="cart-item-stepper">
              <button class="btn-cart-minus" data-cart-index="${idx}">−</button>
              <span>${cartItem.quantity}</span>
              <button class="btn-cart-plus" data-cart-index="${idx}">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Cart item events
  container.querySelectorAll('.btn-cart-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-cart-index'), 10);
      AppState.cart[idx].quantity += 1;
      saveCartToStorage();
      updateCartUI();
    });
  });

  container.querySelectorAll('.btn-cart-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-cart-index'), 10);
      if (AppState.cart[idx].quantity > 1) {
        AppState.cart[idx].quantity -= 1;
      } else {
        AppState.cart.splice(idx, 1);
      }
      saveCartToStorage();
      updateCartUI();
    });
  });

  container.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-cart-index'), 10);
      AppState.cart.splice(idx, 1);
      saveCartToStorage();
      updateCartUI();
      showToast('Item berhasil dihapus dari keranjang', 'info');
    });
  });
}

// Calculate totals, discounts, shipping, tax
function calculateCartTotals() {
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  // Free shipping progress calculation
  const freeThreshold = RESTAURANT_INFO.freeDeliveryThreshold;
  const progressFill = document.getElementById('shipping-progress-fill');
  const progressText = document.getElementById('free-shipping-text');

  if (progressFill && progressText) {
    if (subtotal >= freeThreshold) {
      progressFill.style.width = '100%';
      progressText.innerHTML = '🎉 <strong>Selamat! Anda berhak mendapatkan GRATIS ONGKIR!</strong>';
    } else {
      const remaining = freeThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      progressFill.style.width = `${pct}%`;
      progressText.innerHTML = `Tambah <strong>${formatRupiah(remaining)}</strong> lagi untuk Gratis Ongkir!`;
    }
  }

  // Calculate voucher discount
  let discount = 0;
  if (AppState.appliedVoucher && subtotal > 0) {
    const v = AppState.appliedVoucher;
    if (v.minSpend && subtotal < v.minSpend) {
      // voucher requirements no longer met
      removeAppliedVoucher(false);
    } else if (v.type === 'fixed') {
      discount = v.discount;
    } else if (v.type === 'percent') {
      discount = (subtotal * v.percent) / 100;
      if (v.maxDiscount && discount > v.maxDiscount) discount = v.maxDiscount;
    } else if (v.type === 'delivery') {
      // delivery discount applied on shipping below
    }
  }

  // Shipping fee
  let shipping = 0;
  if (AppState.orderType === 'delivery') {
    if (subtotal >= freeThreshold) {
      shipping = 0;
    } else if (AppState.appliedVoucher && AppState.appliedVoucher.type === 'delivery') {
      shipping = Math.max(0, RESTAURANT_INFO.deliveryFee - AppState.appliedVoucher.discount);
    } else {
      shipping = RESTAURANT_INFO.deliveryFee;
    }
  }

  // Restaurant tax 10%
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * RESTAURANT_INFO.taxRate);

  // Grand Total
  const grandTotal = Math.max(0, subtotal - discount + shipping + tax);

  // Update UI in drawer
  const elSubtotal = document.getElementById('summary-subtotal');
  const elDiscountRow = document.getElementById('summary-discount-row');
  const elDiscount = document.getElementById('summary-discount');
  const elShipping = document.getElementById('summary-shipping');
  const elTax = document.getElementById('summary-tax');
  const elGrand = document.getElementById('summary-grand-total');

  if (elSubtotal) elSubtotal.textContent = formatRupiah(subtotal);
  if (elDiscountRow && elDiscount) {
    if (discount > 0) {
      elDiscountRow.style.display = 'flex';
      elDiscount.textContent = `-${formatRupiah(discount)}`;
    } else {
      elDiscountRow.style.display = 'none';
    }
  }
  if (elShipping) {
    if (AppState.orderType !== 'delivery') {
      elShipping.textContent = 'Rp 0 (Bukan Pengantaran)';
    } else if (shipping === 0) {
      elShipping.innerHTML = '<span style="color:var(--success); font-weight:700;">GRATIS</span>';
    } else {
      elShipping.textContent = formatRupiah(shipping);
    }
  }
  if (elTax) elTax.textContent = formatRupiah(tax);
  if (elGrand) elGrand.textContent = formatRupiah(grandTotal);

  return { subtotal, discount, shipping, tax, grandTotal };
}

// Apply Voucher Code
function applyVoucherCode(code, openDrawerIfClosed = false) {
  const codeNormalized = code.toUpperCase().trim();
  const voucher = PROMO_VOUCHERS.find(v => v.code === codeNormalized);

  if (!voucher) {
    showToast(`Kode voucher "${codeNormalized}" tidak valid!`, 'error');
    return;
  }

  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  if (voucher.minSpend && subtotal < voucher.minSpend) {
    showToast(`Kupon ${voucher.code} memerlukan minimal belanja ${formatRupiah(voucher.minSpend)}`, 'error');
    if (openDrawerIfClosed) openCartDrawer();
    return;
  }

  AppState.appliedVoucher = voucher;

  const alertBox = document.getElementById('applied-voucher-alert');
  const codeEl = document.getElementById('applied-voucher-code');
  const descEl = document.getElementById('applied-voucher-desc');
  const inputEl = document.getElementById('voucher-input');

  if (alertBox && codeEl && descEl) {
    codeEl.textContent = voucher.code;
    descEl.textContent = voucher.title;
    alertBox.style.display = 'flex';
    if (inputEl) inputEl.value = '';
  }

  calculateCartTotals();
  showToast(`🎉 Voucher ${voucher.code} berhasil diterapkan!`, 'success');

  if (openDrawerIfClosed) openCartDrawer();
}

function removeAppliedVoucher(showNotice = true) {
  AppState.appliedVoucher = null;
  const alertBox = document.getElementById('applied-voucher-alert');
  if (alertBox) alertBox.style.display = 'none';
  calculateCartTotals();
  if (showNotice) showToast('Voucher promo telah dihapus', 'info');
}

// ================= CHECKOUT MODAL =================
function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast('Keranjang Anda masih kosong. Silakan pilih menu dulu!', 'error');
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById('checkout-modal-backdrop');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Sync order type radios with AppState
  const radios = document.querySelectorAll('input[name="orderType"]');
  radios.forEach(r => {
    r.checked = (r.value === AppState.orderType);
    r.closest('.type-radio-card').classList.toggle('active', r.checked);
  });
  updateCheckoutDestinationField(AppState.orderType);

  // Sync totals
  updateCheckoutReviewCard();
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal-backdrop');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function updateCheckoutDestinationField(type) {
  const destGroup = document.getElementById('destination-group');
  const destLabel = document.getElementById('destination-label');
  const destInput = document.getElementById('cust-destination');

  if (type === 'delivery') {
    destLabel.innerHTML = 'Alamat Pengantaran Lengkap <span class="required">*</span>';
    destInput.placeholder = 'Jl. Mawar No. 12, Kel. Sukolilo, Surabaya (Patokan depan minimarket)';
  } else if (type === 'dinein') {
    destLabel.innerHTML = 'Nomor Meja Restoran <span class="required">*</span>';
    destInput.placeholder = 'Contoh: Meja No. 08 (Lantai 1)';
  } else if (type === 'takeaway') {
    destLabel.innerHTML = 'Waktu Pengambilan / Catatan Khusus <span class="required">*</span>';
    destInput.placeholder = 'Contoh: Diambil jam 13.00, tolong dipacking rapi';
  }
}

function updateCheckoutReviewCard() {
  const { subtotal, discount, shipping, tax, grandTotal } = calculateCartTotals();
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById('co-item-count').textContent = totalCount;
  document.getElementById('co-subtotal').textContent = formatRupiah(subtotal);

  const discountRow = document.getElementById('co-discount-row');
  if (discount > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('co-discount').textContent = `-${formatRupiah(discount)}`;
  } else {
    discountRow.style.display = 'none';
  }

  const elShip = document.getElementById('co-shipping');
  if (AppState.orderType !== 'delivery') {
    elShip.textContent = 'Rp 0';
  } else if (shipping === 0) {
    elShip.innerHTML = '<span style="color:var(--success); font-weight:700;">GRATIS</span>';
  } else {
    elShip.textContent = formatRupiah(shipping);
  }

  document.getElementById('co-tax').textContent = formatRupiah(tax);
  document.getElementById('co-total').textContent = formatRupiah(grandTotal);
  document.getElementById('confirm-payment-amount').textContent = formatRupiah(grandTotal);
}

// Process Order Submission
function handleOrderSubmission() {
  const nameInput = document.getElementById('cust-name');
  const phoneInput = document.getElementById('cust-phone');
  const destInput = document.getElementById('cust-destination');

  if (!nameInput.value.trim()) {
    showToast('Mohon masukkan nama pemesan!', 'error');
    nameInput.focus();
    return;
  }
  if (!phoneInput.value.trim()) {
    showToast('Mohon masukkan nomor WhatsApp!', 'error');
    phoneInput.focus();
    return;
  }
  if (!destInput.value.trim()) {
    showToast('Mohon lengkapi alamat / nomor meja!', 'error');
    destInput.focus();
    return;
  }

  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked').value;
  const totals = calculateCartTotals();

  // Create active order object
  const orderId = `SAV-${Math.floor(100000 + Math.random() * 900000)}`;
  AppState.activeOrder = {
    id: orderId,
    customerName: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    destination: destInput.value.trim(),
    orderType: AppState.orderType,
    paymentMethod: selectedPayment,
    items: JSON.parse(JSON.stringify(AppState.cart)),
    totals,
    timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
  };

  closeCheckoutModal();

  if (selectedPayment === 'qris') {
    openQrisModal();
  } else {
    // Direct success simulation for other payment methods
    showToast('Pembayaran terkonfirmasi! Menyiapkan pesanan...', 'success');
    finalizeOrderAndLaunchTracker();
  }
}

// ================= QRIS MODAL & SIMULATION =================
function openQrisModal() {
  const modal = document.getElementById('qris-modal-backdrop');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  document.getElementById('qris-invoice-id').textContent = `#${AppState.activeOrder.id}`;
  document.getElementById('qris-nominal-value').textContent = formatRupiah(AppState.activeOrder.totals.grandTotal);

  // Start 5-minute countdown
  let timeLeft = 299; // 04:59
  const timerEl = document.getElementById('qris-countdown');

  if (AppState.qrisCountdownInterval) clearInterval(AppState.qrisCountdownInterval);

  AppState.qrisCountdownInterval = setInterval(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(AppState.qrisCountdownInterval);
      showToast('Waktu pembayaran QRIS habis. Silakan coba lagi.', 'error');
      closeQrisModal();
    }
  }, 1000);
}

function closeQrisModal() {
  const modal = document.getElementById('qris-modal-backdrop');
  modal.style.display = 'none';
  document.body.style.overflow = '';
  if (AppState.qrisCountdownInterval) clearInterval(AppState.qrisCountdownInterval);
}

// User clicks "Simulasikan Bayar Sukses"
function handleQrisMockSuccess() {
  closeQrisModal();
  showToast('✅ Pembayaran QRIS Berhasil Diverifikasi!', 'success');
  finalizeOrderAndLaunchTracker();
}

// Finalize order, clear cart, and start live order tracker
function finalizeOrderAndLaunchTracker() {
  // Clear cart
  AppState.cart = [];
  AppState.appliedVoucher = null;
  saveCartToStorage();
  updateCartUI();

  // Open Tracker Modal
  openTrackerModal();
}

// ================= LIVE ORDER TRACKER & RECEIPT =================
function openTrackerModal() {
  const modal = document.getElementById('tracker-modal-backdrop');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const order = AppState.activeOrder;
  if (!order) return;

  document.getElementById('tracker-order-id').textContent = `#${order.id}`;

  // Populate digital receipt
  document.getElementById('receipt-id').textContent = `#${order.id}`;
  document.getElementById('receipt-date').textContent = order.timestamp;
  document.getElementById('receipt-customer').textContent = `${order.customerName} (${order.phone})`;
  
  const typeMap = { delivery: 'Pesan Antar (Delivery)', dinein: 'Dine In (Makan di Resto)', takeaway: 'Takeaway (Bawa Pulang)' };
  const payMap = { qris: 'QRIS', ewallet: 'E-Wallet', va: 'Virtual Account Bank', cash: 'Tunai / COD' };
  document.getElementById('receipt-type').textContent = `${typeMap[order.orderType]} • ${payMap[order.paymentMethod]}`;
  document.getElementById('receipt-address').textContent = order.destination;

  // Receipt items list
  const receiptItemsContainer = document.getElementById('receipt-items-list');
  receiptItemsContainer.innerHTML = order.items.map(item => `
    <div class="receipt-item-line">
      <span class="rc-item-name">${item.quantity}x ${item.name}</span>
      <span>${formatRupiah(item.unitPrice * item.quantity)}</span>
    </div>
    ${item.toppings.length > 0 || item.portionName ? `
      <div class="rc-item-details">
        ${item.portionName ? `[${item.portionName}] ` : ''}${item.toppings.map(t => t.name).join(', ')}
      </div>
    ` : ''}
  `).join('');

  // Receipt totals
  document.getElementById('rc-subtotal').textContent = formatRupiah(order.totals.subtotal);
  const rcDiscRow = document.getElementById('rc-discount-row');
  if (order.totals.discount > 0) {
    rcDiscRow.style.display = 'flex';
    document.getElementById('rc-discount').textContent = `-${formatRupiah(order.totals.discount)}`;
  } else {
    rcDiscRow.style.display = 'none';
  }
  document.getElementById('rc-shipping').textContent = order.totals.shipping === 0 ? 'GRATIS' : formatRupiah(order.totals.shipping);
  document.getElementById('rc-tax').textContent = formatRupiah(order.totals.tax);
  document.getElementById('rc-grand-total').textContent = formatRupiah(order.totals.grandTotal);

  // Customize Step 3 title based on order type
  const step3Title = document.getElementById('step-3-title');
  const step3Desc = document.getElementById('step-3-desc');
  if (order.orderType === 'dinein') {
    step3Title.textContent = 'Disajikan Menuju Meja Anda';
    step3Desc.textContent = 'Pelayan restoran sedang membawa hidangan ke meja Anda.';
  } else if (order.orderType === 'takeaway') {
    step3Title.textContent = 'Pesanan Siap Diambil';
    step3Desc.textContent = 'Makanan sudah dipacking rapi di counter pickup.';
  } else {
    step3Title.textContent = 'Dalam Pengantaran Kurir';
    step3Desc.textContent = 'Kurir membawa makanan hangat menuju alamat Anda.';
  }

  // Start Stepper at Step 1
  AppState.trackerStep = 1;
  updateStepperUI();

  // Automatic progression simulation every 6 seconds
  if (AppState.trackerInterval) clearInterval(AppState.trackerInterval);
  AppState.trackerInterval = setInterval(() => {
    if (AppState.trackerStep < 4) {
      AppState.trackerStep += 1;
      updateStepperUI();
    } else {
      clearInterval(AppState.trackerInterval);
    }
  }, 6000);
}

function closeTrackerModal() {
  const modal = document.getElementById('tracker-modal-backdrop');
  modal.style.display = 'none';
  document.body.style.overflow = '';
  if (AppState.trackerInterval) clearInterval(AppState.trackerInterval);
}

function advanceTrackerStep() {
  if (AppState.trackerStep < 4) {
    AppState.trackerStep += 1;
    updateStepperUI();
  } else {
    showToast('Pesanan sudah selesai! Selamat menikmati hidangan.', 'success');
  }
}

function updateStepperUI() {
  const currentStep = AppState.trackerStep;
  const headline = document.getElementById('tracker-headline');

  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`step-${i}`);
    if (!stepEl) continue;

    stepEl.classList.remove('step-completed', 'step-active');
    if (i < currentStep) {
      stepEl.classList.add('step-completed');
    } else if (i === currentStep) {
      stepEl.classList.add('step-active');
    }
  }

  if (currentStep === 1) {
    headline.textContent = 'Pesanan Telah Terkonfirmasi!';
  } else if (currentStep === 2) {
    headline.textContent = 'Chef Sedang Memasak Menu Anda 🍳';
  } else if (currentStep === 3) {
    headline.textContent = AppState.activeOrder.orderType === 'dinein' 
      ? 'Pesanan Siap Disajikan ke Meja! 🍽️' 
      : 'Pesanan Sedang Dalam Perjalanan! 🛵';
  } else if (currentStep === 4) {
    headline.textContent = 'Pesanan Tiba & Selesai! Selamat Menikmati 🎉';
    showToast('🎉 Pesanan Anda telah tiba! Selamat menikmati hidangan Savoria Bistro.', 'success');
  }
}

// ================= ORDER TYPE SWITCH =================
function cycleOrderType() {
  const types = ['delivery', 'dinein', 'takeaway'];
  const currentIdx = types.indexOf(AppState.orderType);
  const nextType = types[(currentIdx + 1) % types.length];
  setOrderType(nextType);
}

function setOrderType(type) {
  AppState.orderType = type;
  localStorage.setItem('savoria_ordertype', type);
  updateOrderTypeBadgeUI();
  calculateCartTotals();
  showToast(`Metode diubah ke: ${getOrderTypeLabel(type)}`, 'info');
}

function getOrderTypeLabel(type) {
  if (type === 'dinein') return 'Dine In (Makan di Tempat)';
  if (type === 'takeaway') return 'Takeaway (Bawa Pulang)';
  return 'Delivery (Pesan Antar)';
}

function updateOrderTypeBadgeUI() {
  const iconEl = document.getElementById('order-type-icon');
  const labelEl = document.getElementById('order-type-label');
  if (!iconEl || !labelEl) return;

  if (AppState.orderType === 'dinein') {
    iconEl.textContent = '🍽️';
    labelEl.textContent = 'Dine In';
  } else if (AppState.orderType === 'takeaway') {
    iconEl.textContent = '🥡';
    labelEl.textContent = 'Takeaway';
  } else {
    iconEl.textContent = '🛵';
    labelEl.textContent = 'Delivery';
  }
}

// ================= TOAST NOTIFICATION SYSTEM =================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '🔔';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';
  if (type === 'info') icon = '💡';

  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ================= ATTACH EVENT LISTENERS =================
function attachEventListeners() {
  // Search input listeners (Desktop & Mobile)
  const searchInput = document.getElementById('search-input');
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');

  function handleSearch(val) {
    AppState.searchQuery = val;
    if (searchClearBtn) searchClearBtn.style.display = val ? 'block' : 'none';
    renderMenuGrid();
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
      if (mobileSearchInput) mobileSearchInput.value = e.target.value;
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
      if (searchInput) searchInput.value = e.target.value;
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (mobileSearchInput) mobileSearchInput.value = '';
      handleSearch('');
    });
  }

  // Reset filter button on empty state
  const resetBtn = document.getElementById('reset-filter-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      AppState.searchQuery = '';
      AppState.activeCategory = 'all';
      AppState.filterPromo = false;
      AppState.filterBestSeller = false;
      if (searchInput) searchInput.value = '';
      if (mobileSearchInput) mobileSearchInput.value = '';
      document.getElementById('filter-promo-checkbox').checked = false;
      document.getElementById('filter-bestseller-checkbox').checked = false;
      document.getElementById('filter-promo-label').classList.remove('active');
      document.getElementById('filter-bestseller-label').classList.remove('active');
      renderCategories();
      renderMenuGrid();
    });
  }

  // Sort select
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderMenuGrid();
    });
  }

  // Filter toggles
  const promoCb = document.getElementById('filter-promo-checkbox');
  const promoLabel = document.getElementById('filter-promo-label');
  if (promoCb && promoLabel) {
    promoCb.addEventListener('change', (e) => {
      AppState.filterPromo = e.target.checked;
      promoLabel.classList.toggle('active', e.target.checked);
      renderMenuGrid();
    });
  }

  const bestCb = document.getElementById('filter-bestseller-checkbox');
  const bestLabel = document.getElementById('filter-bestseller-label');
  if (bestCb && bestLabel) {
    bestCb.addEventListener('change', (e) => {
      AppState.filterBestSeller = e.target.checked;
      bestLabel.classList.toggle('active', e.target.checked);
      renderMenuGrid();
    });
  }

  // Order Type toggle button on navbar
  const orderTypeBtn = document.getElementById('order-type-toggle-btn');
  if (orderTypeBtn) {
    orderTypeBtn.addEventListener('click', cycleOrderType);
  }

  // Wishlist button on navbar
  const wishlistBtn = document.getElementById('wishlist-btn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      if (AppState.favorites.length === 0) {
        showToast('Anda belum memiliki menu favorit. Klik tombol ❤️ pada menu untuk menyimpannya!', 'info');
      } else {
        // filter by favorites
        showToast(`Menampilkan ${AppState.favorites.length} menu favorit Anda`, 'info');
        const container = document.getElementById('menu-grid');
        const items = MENU_ITEMS.filter(i => AppState.favorites.includes(i.id));
        AppState.searchQuery = '';
        AppState.activeCategory = 'all';
        renderCategories();
        // scroll to menu
        document.getElementById('menu-catalog').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Cart open/close triggers
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('cart-close-btn');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const mobileCartTrigger = document.getElementById('mobile-floating-cart-trigger');

  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (mobileCartTrigger) mobileCartTrigger.addEventListener('click', openCartDrawer);
  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', (e) => {
      if (e.target === cartBackdrop) closeCartDrawer();
    });
  }

  // Customization modal stepper
  const qtyMinus = document.getElementById('modal-qty-minus');
  const qtyPlus = document.getElementById('modal-qty-plus');
  const qtyDisplay = document.getElementById('modal-qty-display');

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (AppState.modalSelection.quantity > 1) {
        AppState.modalSelection.quantity -= 1;
        qtyDisplay.textContent = AppState.modalSelection.quantity;
        updateModalAddPrice();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      AppState.modalSelection.quantity += 1;
      qtyDisplay.textContent = AppState.modalSelection.quantity;
      updateModalAddPrice();
    });
  }

  const customModalClose = document.getElementById('custom-modal-close');
  const customModalBackdrop = document.getElementById('custom-modal-backdrop');
  if (customModalClose) customModalClose.addEventListener('click', closeCustomizationModal);
  if (customModalBackdrop) {
    customModalBackdrop.addEventListener('click', (e) => {
      if (e.target === customModalBackdrop) closeCustomizationModal();
    });
  }

  const confirmAddBtn = document.getElementById('modal-confirm-add-btn');
  if (confirmAddBtn) confirmAddBtn.addEventListener('click', confirmAddToCart);

  // Voucher input & apply
  const applyVoucherBtn = document.getElementById('apply-voucher-btn');
  const voucherInput = document.getElementById('voucher-input');
  if (applyVoucherBtn && voucherInput) {
    applyVoucherBtn.addEventListener('click', () => {
      const code = voucherInput.value;
      if (code) applyVoucherCode(code);
    });
    voucherInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const code = voucherInput.value;
        if (code) applyVoucherCode(code);
      }
    });
  }

  const removeVoucherBtn = document.getElementById('remove-voucher-btn');
  if (removeVoucherBtn) removeVoucherBtn.addEventListener('click', () => removeAppliedVoucher(true));

  // Proceed to checkout button from cart drawer
  const proceedBtn = document.getElementById('proceed-to-checkout-btn');
  if (proceedBtn) proceedBtn.addEventListener('click', openCheckoutModal);

  // Checkout modal controls
  const checkoutCloseBtn = document.getElementById('checkout-modal-close');
  const checkoutCancelBtn = document.getElementById('checkout-cancel-btn');
  const checkoutBackdrop = document.getElementById('checkout-modal-backdrop');

  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
  if (checkoutCancelBtn) checkoutCancelBtn.addEventListener('click', () => {
    closeCheckoutModal();
    openCartDrawer();
  });
  if (checkoutBackdrop) {
    checkoutBackdrop.addEventListener('click', (e) => {
      if (e.target === checkoutBackdrop) closeCheckoutModal();
    });
  }

  // Order type radios inside checkout form
  const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
  orderTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.type-radio-card').forEach(c => c.classList.remove('active'));
      radio.closest('.type-radio-card').classList.add('active');
      AppState.orderType = radio.value;
      updateOrderTypeBadgeUI();
      updateCheckoutDestinationField(radio.value);
      updateCheckoutReviewCard();
    });
  });

  // Payment method cards inside checkout form
  const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
  paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
      radio.closest('.payment-method-card').classList.add('active');
    });
  });

  // Confirm checkout form submit
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleOrderSubmission);

  // QRIS modal controls
  const cancelQrisBtn = document.getElementById('cancel-qris-btn');
  const mockPaySuccessBtn = document.getElementById('mock-pay-success-btn');
  if (cancelQrisBtn) cancelQrisBtn.addEventListener('click', () => {
    closeQrisModal();
    openCheckoutModal();
  });
  if (mockPaySuccessBtn) mockPaySuccessBtn.addEventListener('click', handleQrisMockSuccess);

  // Tracker modal controls
  const trackerCloseBtn = document.getElementById('tracker-modal-close');
  const fastForwardBtn = document.getElementById('fast-forward-step-btn');
  const printReceiptBtn = document.getElementById('print-receipt-btn');
  const orderAgainBtn = document.getElementById('order-again-btn');

  if (trackerCloseBtn) trackerCloseBtn.addEventListener('click', closeTrackerModal);
  if (fastForwardBtn) fastForwardBtn.addEventListener('click', advanceTrackerStep);
  if (printReceiptBtn) printReceiptBtn.addEventListener('click', () => window.print());
  if (orderAgainBtn) {
    orderAgainBtn.addEventListener('click', () => {
      closeTrackerModal();
      document.getElementById('menu-catalog').scrollIntoView({ behavior: 'smooth' });
      showToast('Silakan pilih menu makanan favorit lainnya!', 'info');
    });
  }

  // Hero voucher CTA button
  const heroVoucherBtn = document.getElementById('open-voucher-modal-btn');
  if (heroVoucherBtn) {
    heroVoucherBtn.addEventListener('click', () => {
      document.getElementById('vouchers-quick-list').scrollIntoView({ behavior: 'smooth' });
    });
  }
}
