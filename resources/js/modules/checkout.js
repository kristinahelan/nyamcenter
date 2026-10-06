/**
 * Checkout Modal & Order Submission Logic
 */

import { AppState } from './state.js';
import { formatRupiah, showToast } from './utils.js';
import { calculateCartTotals, closeCartDrawer } from './cart.js';
import { openQrisModal } from './qris.js';
import { finalizeOrderAndLaunchTracker } from './tracker.js';

export function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast('Keranjang Anda masih kosong. Silakan pilih menu dulu!', 'error');
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById('checkout-modal-backdrop');
  if (modal) modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const radios = document.querySelectorAll('input[name="orderType"]');
  radios.forEach(r => {
    r.checked = (r.value === AppState.orderType);
    const card = r.closest('.type-radio-card');
    if (card) card.classList.toggle('active', r.checked);
  });
  updateCheckoutDestinationField(AppState.orderType);
  updateCheckoutReviewCard();
}

export function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal-backdrop');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

export function updateCheckoutDestinationField(type) {
  const destLabel = document.getElementById('destination-label');
  const destInput = document.getElementById('cust-destination');
  if (!destLabel || !destInput) return;

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

export function updateCheckoutReviewCard() {
  const { subtotal, discount, shipping, tax, grandTotal } = calculateCartTotals();
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);

  const itemCountEl = document.getElementById('co-item-count');
  const subtotalEl = document.getElementById('co-subtotal');
  const discountRow = document.getElementById('co-discount-row');
  const discountEl = document.getElementById('co-discount');
  const elShip = document.getElementById('co-shipping');
  const taxEl = document.getElementById('co-tax');
  const totalEl = document.getElementById('co-total');
  const confirmAmountEl = document.getElementById('confirm-payment-amount');

  if (itemCountEl) itemCountEl.textContent = totalCount;
  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);

  if (discountRow && discountEl) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-${formatRupiah(discount)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (elShip) {
    if (AppState.orderType !== 'delivery') {
      elShip.textContent = 'Rp 0';
    } else if (shipping === 0) {
      elShip.innerHTML = '<span style="color:var(--success); font-weight:700;">GRATIS</span>';
    } else {
      elShip.textContent = formatRupiah(shipping);
    }
  }

  if (taxEl) taxEl.textContent = formatRupiah(tax);
  if (totalEl) totalEl.textContent = formatRupiah(grandTotal);
  if (confirmAmountEl) confirmAmountEl.textContent = formatRupiah(grandTotal);
}

export function handleOrderSubmission() {
  const nameInput = document.getElementById('cust-name');
  const phoneInput = document.getElementById('cust-phone');
  const destInput = document.getElementById('cust-destination');

  if (!nameInput || !nameInput.value.trim()) {
    showToast('Mohon masukkan nama pemesan!', 'error');
    if (nameInput) nameInput.focus();
    return;
  }
  if (!phoneInput || !phoneInput.value.trim()) {
    showToast('Mohon masukkan nomor WhatsApp!', 'error');
    if (phoneInput) phoneInput.focus();
    return;
  }
  if (!destInput || !destInput.value.trim()) {
    showToast('Mohon lengkapi alamat / nomor meja!', 'error');
    if (destInput) destInput.focus();
    return;
  }

  const selectedPaymentEl = document.querySelector('input[name="paymentMethod"]:checked');
  const selectedPayment = selectedPaymentEl ? selectedPaymentEl.value : 'qris';
  const totals = calculateCartTotals();

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
    showToast('Pembayaran terkonfirmasi! Menyiapkan pesanan...', 'success');
    finalizeOrderAndLaunchTracker();
  }
}
