/**
 * Currency Formatting & Toast Notification Helpers
 */

export function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '<i class="fa-solid fa-circle-info text-sky-500"></i>';
  if (type === 'success') icon = '<i class="fa-solid fa-circle-check text-emerald-500"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-triangle-exclamation text-rose-500"></i>';
  if (type === 'info') icon = '<i class="fa-solid fa-circle-info text-sky-500"></i>';

  toast.innerHTML = `<span class="toast-icon-wrap">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
