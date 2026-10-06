/**
 * Global Event Listeners Binder
 */

import { AppState } from './state.js';
import { showToast } from './utils.js';
import { MENU_ITEMS } from './data.js';
import { renderCategories, renderMenuGrid } from './menu.js';
import { openCartDrawer, closeCartDrawer, applyVoucherCode, removeAppliedVoucher } from './cart.js';
import { openCustomizationModal, closeCustomizationModal, updateModalAddPrice, confirmAddToCart } from './custom-modal.js';
import { openCheckoutModal, closeCheckoutModal, updateCheckoutDestinationField, updateCheckoutReviewCard, handleOrderSubmission } from './checkout.js';
import { closeQrisModal, handleQrisMockSuccess } from './qris.js';
import { closeTrackerModal, advanceTrackerStep } from './tracker.js';
import { cycleOrderType, updateOrderTypeBadgeUI } from './order-type.js';

export function attachEventListeners() {
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
      
      const promoCb = document.getElementById('filter-promo-checkbox');
      const bestCb = document.getElementById('filter-bestseller-checkbox');
      const promoLbl = document.getElementById('filter-promo-label');
      const bestLbl = document.getElementById('filter-bestseller-label');
      
      if (promoCb) promoCb.checked = false;
      if (bestCb) bestCb.checked = false;
      if (promoLbl) promoLbl.classList.remove('active');
      if (bestLbl) bestLbl.classList.remove('active');
      
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
        showToast(`Menampilkan ${AppState.favorites.length} menu favorit Anda`, 'info');
        AppState.searchQuery = '';
        AppState.activeCategory = 'all';
        renderCategories();
        const catalogEl = document.getElementById('menu-catalog');
        if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
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
        if (qtyDisplay) qtyDisplay.textContent = AppState.modalSelection.quantity;
        updateModalAddPrice();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      AppState.modalSelection.quantity += 1;
      if (qtyDisplay) qtyDisplay.textContent = AppState.modalSelection.quantity;
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
      const card = radio.closest('.type-radio-card');
      if (card) card.classList.add('active');
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
      const card = radio.closest('.payment-method-card');
      if (card) card.classList.add('active');
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
      const catalogEl = document.getElementById('menu-catalog');
      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
      showToast('Silakan pilih menu makanan favorit lainnya!', 'info');
    });
  }

  // Hero voucher CTA button
  const heroVoucherBtn = document.getElementById('open-voucher-modal-btn');
  if (heroVoucherBtn) {
    heroVoucherBtn.addEventListener('click', () => {
      const vList = document.getElementById('vouchers-quick-list');
      if (vList) vList.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
