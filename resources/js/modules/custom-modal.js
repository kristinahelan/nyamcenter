/**
 * Menu Customization Modal Logic
 */

import { AppState, saveCartToStorage } from './state.js';
import { formatRupiah, showToast } from './utils.js';
import { MENU_ITEMS } from './data.js';
import { updateCartUI } from './cart.js';

export function openCustomizationModal(itemId) {
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
  const modalImg = document.getElementById('modal-menu-img');
  if (modalImg) modalImg.src = item.image;
  
  const titleEl = document.getElementById('modal-menu-title');
  if (titleEl) titleEl.textContent = item.name;

  const descEl = document.getElementById('modal-menu-desc');
  if (descEl) descEl.textContent = item.description;

  const catEl = document.getElementById('modal-menu-category');
  if (catEl) catEl.textContent = item.category.toUpperCase().replace('-', ' ');

  const ratingEl = document.getElementById('modal-menu-rating');
  if (ratingEl) ratingEl.textContent = `⭐ ${item.rating.toFixed(1)}`;

  const prepEl = document.getElementById('modal-prep-time');
  if (prepEl) prepEl.textContent = `⏱️ ${item.prepTime}`;

  const basePriceEl = document.getElementById('modal-base-price');
  if (basePriceEl) basePriceEl.textContent = formatRupiah(item.price);

  const oldPriceEl = document.getElementById('modal-old-price');
  if (oldPriceEl) {
    if (item.originalPrice && item.originalPrice > item.price) {
      oldPriceEl.textContent = formatRupiah(item.originalPrice);
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }
  }

  const notesEl = document.getElementById('modal-notes-input');
  if (notesEl) notesEl.value = '';

  const qtyEl = document.getElementById('modal-qty-display');
  if (qtyEl) qtyEl.textContent = '1';

  // Render Portion Options
  const portionContainer = document.getElementById('portion-options-container');
  if (portionContainer) {
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
  }

  // Render Spicy / Variant Options
  const spicySection = document.getElementById('spicy-section');
  const spicyContainer = document.getElementById('spicy-options-container');
  if (spicySection && spicyContainer) {
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
  }

  // Render Topping Options
  const toppingSection = document.getElementById('topping-section');
  const toppingContainer = document.getElementById('topping-options-container');
  if (toppingSection && toppingContainer) {
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
          if (row) row.classList.toggle('selected', checkbox.checked);

          const checkedIds = Array.from(toppingContainer.querySelectorAll('input[name="toppingOption"]:checked'))
            .map(cb => cb.value);

          AppState.modalSelection.toppings = item.options.toppings.filter(t => checkedIds.includes(t.id));
          updateModalAddPrice();
        });
      });
    } else {
      toppingSection.style.display = 'none';
    }
  }

  updateModalAddPrice();

  const modal = document.getElementById('custom-modal-backdrop');
  if (modal) modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

export function closeCustomizationModal() {
  const modal = document.getElementById('custom-modal-backdrop');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

export function updateModalAddPrice() {
  if (!AppState.currentActiveItem) return;
  const basePrice = AppState.currentActiveItem.price;
  const portionExtra = AppState.modalSelection.portion ? AppState.modalSelection.portion.extra : 0;
  const toppingsTotal = AppState.modalSelection.toppings.reduce((sum, t) => sum + t.price, 0);

  const unitPrice = basePrice + portionExtra + toppingsTotal;
  const totalPrice = unitPrice * AppState.modalSelection.quantity;

  const totalEl = document.getElementById('modal-total-add-price');
  if (totalEl) totalEl.textContent = formatRupiah(totalPrice);
}

export function confirmAddToCart() {
  if (!AppState.currentActiveItem) return;

  const item = AppState.currentActiveItem;
  const portion = AppState.modalSelection.portion;
  const spicy = AppState.modalSelection.spicyLevel;
  const toppings = AppState.modalSelection.toppings;
  const notesInput = document.getElementById('modal-notes-input');
  const notes = notesInput ? notesInput.value.trim() : '';
  const quantity = AppState.modalSelection.quantity;

  const basePrice = item.price;
  const portionExtra = portion ? portion.extra : 0;
  const toppingsExtra = toppings.reduce((sum, t) => sum + t.price, 0);
  const unitPrice = basePrice + portionExtra + toppingsExtra;

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
