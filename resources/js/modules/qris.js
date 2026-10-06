/**
 * QRIS Simulation & Dynamic Countdown
 */

import { AppState } from './state.js';
import { formatRupiah, showToast } from './utils.js';
import { finalizeOrderAndLaunchTracker } from './tracker.js';

export function openQrisModal() {
  const modal = document.getElementById('qris-modal-backdrop');
  if (modal) modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const invoiceEl = document.getElementById('qris-invoice-id');
  const nominalEl = document.getElementById('qris-nominal-value');

  if (invoiceEl && AppState.activeOrder) invoiceEl.textContent = `#${AppState.activeOrder.id}`;
  if (nominalEl && AppState.activeOrder) nominalEl.textContent = formatRupiah(AppState.activeOrder.totals.grandTotal);

  let timeLeft = 299; // 04:59
  const timerEl = document.getElementById('qris-countdown');

  if (AppState.qrisCountdownInterval) clearInterval(AppState.qrisCountdownInterval);

  AppState.qrisCountdownInterval = setInterval(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    if (timerEl) timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(AppState.qrisCountdownInterval);
      showToast('Waktu pembayaran QRIS habis. Silakan coba lagi.', 'error');
      closeQrisModal();
    }
  }, 1000);
}

export function closeQrisModal() {
  const modal = document.getElementById('qris-modal-backdrop');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
  if (AppState.qrisCountdownInterval) clearInterval(AppState.qrisCountdownInterval);
}

export function handleQrisMockSuccess() {
  closeQrisModal();
  showToast('✅ Pembayaran QRIS Berhasil Diverifikasi!', 'success');
  finalizeOrderAndLaunchTracker();
}
