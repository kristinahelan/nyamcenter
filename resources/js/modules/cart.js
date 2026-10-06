/**
 * Cart Drawer, Calculations & Voucher Logic
 */

import { AppState, saveCartToStorage } from './state.js';
import { formatRupiah, showToast } from './utils.js';
import { RESTAURANT_INFO, PROMO_VOUCHERS } from './data.js';

export function openCartDrawer() {
  const drawerBackdrop = document.getElementById('cart-backdrop');
  if (drawerBackdrop) drawerBackdrop.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  renderCartDrawerItems();
  calculateCartTotals();
}

export function closeCartDrawer() {
  const drawerBackdrop = document.getElementById('cart-backdrop');
  if (drawerBackdrop) drawerBackdrop.style.display = 'none';
  document.body.style.overflow = '';
}

export function updateCartUI() {
  const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const navBadge = document.getElementById('cart-badge');
  const navPrice = document.getElementById('cart-nav-price');
  if (navBadge) navBadge.textContent = totalItems;
  if (navPrice) navPrice.textContent = formatRupiah(subtotal);

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

  const drawerCount = document.getElementById('drawer-item-count');
  if (drawerCount) drawerCount.textContent = `${totalItems} item`;

  renderCartDrawerItems();
  calculateCartTotals();
}

export function renderCartDrawerItems() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (AppState.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon text-muted"><i class="fa-solid fa-cart-shopping"></i></div>
        <h4>Keranjang Masih Kosong</h4>
        <p>Yuk pilih aneka menu lezat Savoria favoritmu sekarang!</p>
        <button class="btn btn-secondary btn-xs" id="empty-cart-start-btn" style="margin-top: 1rem;">Mulai Pesan</button>
      </div>
    `;
    const startBtn = document.getElementById('empty-cart-start-btn');
    if (startBtn) startBtn.addEventListener('click', closeCartDrawer);
    return;
  }

  container.innerHTML = AppState.cart.map((cartItem, idx) => {
    const toppingsText = cartItem.toppings && cartItem.toppings.length > 0
      ? `+ Topping: ${cartItem.toppings.map(t => t.name).join(', ')}`
      : '';
    const spicyText = cartItem.spicyLevel ? `<i class="fa-solid fa-pepper-hot text-red-500 mr-1"></i> ${cartItem.spicyLevel}` : '';
    const portionText = cartItem.portionName ? `<i class="fa-solid fa-box mr-1"></i> ${cartItem.portionName}` : '';
    const notesText = cartItem.notes ? `<i class="fa-regular fa-note-sticky mr-1"></i> "${cartItem.notes}"` : '';

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
            <button class="cart-item-remove" data-cart-index="${idx}" title="Hapus menu">
              <i class="fa-solid fa-xmark"></i>
            </button>
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

export function calculateCartTotals() {
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const freeThreshold = RESTAURANT_INFO.freeDeliveryThreshold;
  const progressFill = document.getElementById('shipping-progress-fill');
  const progressText = document.getElementById('free-shipping-text');

  if (progressFill && progressText) {
    if (subtotal >= freeThreshold) {
      progressFill.style.width = '100%';
      progressText.innerHTML = '<i class="fa-solid fa-gift text-emerald-500 mr-1"></i> <strong>Selamat! Anda berhak mendapatkan GRATIS ONGKIR!</strong>';
    } else {
      const remaining = freeThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      progressFill.style.width = `${pct}%`;
      progressText.innerHTML = `Tambah <strong>${formatRupiah(remaining)}</strong> lagi untuk Gratis Ongkir!`;
    }
  }

  let discount = 0;
  if (AppState.appliedVoucher && subtotal > 0) {
    const v = AppState.appliedVoucher;
    if (v.minSpend && subtotal < v.minSpend) {
      removeAppliedVoucher(false);
    } else if (v.type === 'fixed') {
      discount = v.discount;
    } else if (v.type === 'percent') {
      discount = (subtotal * v.percent) / 100;
      if (v.maxDiscount && discount > v.maxDiscount) discount = v.maxDiscount;
    }
  }

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

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * RESTAURANT_INFO.taxRate);
  const grandTotal = Math.max(0, subtotal - discount + shipping + tax);

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

export function applyVoucherCode(code, openDrawerIfClosed = false) {
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
  showToast(`Voucher ${voucher.code} berhasil diterapkan!`, 'success');

  if (openDrawerIfClosed) openCartDrawer();
}

export function removeAppliedVoucher(showNotice = true) {
  AppState.appliedVoucher = null;
  const alertBox = document.getElementById('applied-voucher-alert');
  if (alertBox) alertBox.style.display = 'none';
  calculateCartTotals();
  if (showNotice) showToast('Voucher promo telah dihapus', 'info');
}
