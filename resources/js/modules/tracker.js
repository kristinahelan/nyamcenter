/**
 * Live Order Tracker Timeline & Digital Receipt Logic
 */

import { AppState, saveCartToStorage } from './state.js';
import { formatRupiah, showToast } from './utils.js';
import { updateCartUI } from './cart.js';

export function openTrackerModal() {
  const modal = document.getElementById('tracker-modal-backdrop');
  if (modal) modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const order = AppState.activeOrder;
  if (!order) return;

  const trackerIdEl = document.getElementById('tracker-order-id');
  if (trackerIdEl) trackerIdEl.textContent = `#${order.id}`;

  // Populate digital receipt
  const rId = document.getElementById('receipt-id');
  const rDate = document.getElementById('receipt-date');
  const rCust = document.getElementById('receipt-customer');
  const rType = document.getElementById('receipt-type');
  const rAddr = document.getElementById('receipt-address');

  if (rId) rId.textContent = `#${order.id}`;
  if (rDate) rDate.textContent = order.timestamp;
  if (rCust) rCust.textContent = `${order.customerName} (${order.phone})`;
  
  const typeMap = { delivery: 'Pesan Antar (Delivery)', dinein: 'Dine In (Makan di Resto)', takeaway: 'Takeaway (Bawa Pulang)' };
  const payMap = { qris: 'QRIS', ewallet: 'E-Wallet', va: 'Virtual Account Bank', cash: 'Tunai / COD' };
  if (rType) rType.textContent = `${typeMap[order.orderType] || order.orderType} • ${payMap[order.paymentMethod] || order.paymentMethod}`;
  if (rAddr) rAddr.textContent = order.destination;

  // Receipt items list
  const receiptItemsContainer = document.getElementById('receipt-items-list');
  if (receiptItemsContainer) {
    receiptItemsContainer.innerHTML = order.items.map(item => `
      <div class="receipt-item-line">
        <span class="rc-item-name">${item.quantity}x ${item.name}</span>
        <span>${formatRupiah(item.unitPrice * item.quantity)}</span>
      </div>
      ${(item.toppings && item.toppings.length > 0) || item.portionName ? `
        <div class="rc-item-details">
          ${item.portionName ? `[${item.portionName}] ` : ''}${item.toppings ? item.toppings.map(t => t.name).join(', ') : ''}
        </div>
      ` : ''}
    `).join('');
  }

  // Receipt totals
  const rcSubtotal = document.getElementById('rc-subtotal');
  const rcDiscRow = document.getElementById('rc-discount-row');
  const rcDisc = document.getElementById('rc-discount');
  const rcShip = document.getElementById('rc-shipping');
  const rcTax = document.getElementById('rc-tax');
  const rcGrand = document.getElementById('rc-grand-total');

  if (rcSubtotal) rcSubtotal.textContent = formatRupiah(order.totals.subtotal);
  if (rcDiscRow && rcDisc) {
    if (order.totals.discount > 0) {
      rcDiscRow.style.display = 'flex';
      rcDisc.textContent = `-${formatRupiah(order.totals.discount)}`;
    } else {
      rcDiscRow.style.display = 'none';
    }
  }
  if (rcShip) rcShip.textContent = order.totals.shipping === 0 ? 'GRATIS' : formatRupiah(order.totals.shipping);
  if (rcTax) rcTax.textContent = formatRupiah(order.totals.tax);
  if (rcGrand) rcGrand.textContent = formatRupiah(order.totals.grandTotal);

  // Customize Step 3 title based on order type
  const step3Title = document.getElementById('step-3-title');
  const step3Desc = document.getElementById('step-3-desc');
  if (step3Title && step3Desc) {
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

export function closeTrackerModal() {
  const modal = document.getElementById('tracker-modal-backdrop');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
  if (AppState.trackerInterval) clearInterval(AppState.trackerInterval);
}

export function advanceTrackerStep() {
  if (AppState.trackerStep < 4) {
    AppState.trackerStep += 1;
    updateStepperUI();
  } else {
    showToast('Pesanan sudah selesai! Selamat menikmati hidangan.', 'success');
  }
}

export function updateStepperUI() {
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

  if (headline) {
    if (currentStep === 1) {
      headline.textContent = 'Pesanan Telah Terkonfirmasi!';
    } else if (currentStep === 2) {
      headline.textContent = 'Chef Sedang Memasak Menu Anda 🍳';
    } else if (currentStep === 3) {
      headline.textContent = AppState.activeOrder && AppState.activeOrder.orderType === 'dinein' 
        ? 'Pesanan Siap Disajikan ke Meja! 🍽️' 
        : 'Pesanan Sedang Dalam Perjalanan! 🛵';
    } else if (currentStep === 4) {
      headline.textContent = 'Pesanan Tiba & Selesai! Selamat Menikmati 🎉';
      showToast('🎉 Pesanan Anda telah tiba! Selamat menikmati hidangan Savoria Bistro.', 'success');
    }
  }
}

export function finalizeOrderAndLaunchTracker() {
  AppState.cart = [];
  AppState.appliedVoucher = null;
  saveCartToStorage();
  updateCartUI();
  openTrackerModal();
}
