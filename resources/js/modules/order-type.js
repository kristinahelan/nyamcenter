/**
 * Order Type Switcher (Delivery / Dine In / Takeaway)
 */

import { AppState } from './state.js';
import { showToast } from './utils.js';
import { calculateCartTotals } from './cart.js';

export function getOrderTypeLabel(type) {
  if (type === 'dinein') return 'Dine In (Makan di Tempat)';
  if (type === 'takeaway') return 'Takeaway (Bawa Pulang)';
  return 'Delivery (Pesan Antar)';
}

export function updateOrderTypeBadgeUI() {
  const iconEl = document.getElementById('order-type-icon');
  const labelEl = document.getElementById('order-type-label');
  if (!iconEl || !labelEl) return;

  if (AppState.orderType === 'dinein') {
    iconEl.innerHTML = '<i class="fa-solid fa-utensils"></i>';
    labelEl.textContent = 'Dine In';
  } else if (AppState.orderType === 'takeaway') {
    iconEl.innerHTML = '<i class="fa-solid fa-box-archive"></i>';
    labelEl.textContent = 'Takeaway';
  } else {
    iconEl.innerHTML = '<i class="fa-solid fa-motorcycle"></i>';
    labelEl.textContent = 'Delivery';
  }
}

export function setOrderType(type) {
  AppState.orderType = type;
  try {
    localStorage.setItem('savoria_ordertype', type);
  } catch (err) {
    console.error(err);
  }
  updateOrderTypeBadgeUI();
  calculateCartTotals();
  showToast(`Metode diubah ke: ${getOrderTypeLabel(type)}`, 'info');
}

export function cycleOrderType() {
  const types = ['delivery', 'dinein', 'takeaway'];
  const currentIdx = types.indexOf(AppState.orderType);
  const nextType = types[(currentIdx + 1) % types.length];
  setOrderType(nextType);
}
