/**
 * Menu Rendering, Category Filtering, Sorting, and Favorites
 */

import { AppState, saveFavoritesToStorage } from './state.js';
import { formatRupiah, showToast } from './utils.js';
import { MENU_CATEGORIES, MENU_ITEMS, PROMO_VOUCHERS } from './data.js';
import { applyVoucherCode } from './cart.js';
import { openCustomizationModal } from './custom-modal.js';

export function renderCategories() {
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

export function renderVouchersQuickBar() {
  const container = document.getElementById('vouchers-quick-list');
  if (!container) return;

  container.innerHTML = PROMO_VOUCHERS.map(v => `
    <div class="voucher-card" data-voucher-code="${v.code}" title="Klik untuk pakai kupon ${v.code}">
      <span class="voucher-icon text-orange-500"><i class="fa-solid fa-ticket"></i></span>
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

export function renderMenuGrid() {
  const container = document.getElementById('menu-grid');
  const emptyState = document.getElementById('empty-state');
  if (!container) return;

  let items = MENU_ITEMS.filter(item => {
    if (AppState.activeCategory !== 'all' && item.category !== AppState.activeCategory) {
      return false;
    }
    if (AppState.searchQuery.trim() !== '') {
      const q = AppState.searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    if (AppState.filterPromo && !item.isPromo) return false;
    if (AppState.filterBestSeller && !item.isBestSeller) return false;

    return true;
  });

  items.sort((a, b) => {
    if (AppState.sortBy === 'rating') return b.rating - a.rating;
    if (AppState.sortBy === 'price-asc') return a.price - b.price;
    if (AppState.sortBy === 'price-desc') return b.price - a.price;
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
            ${item.isBestSeller ? '<span class="card-badge bestseller"><i class="fa-solid fa-fire text-amber-300 mr-1"></i> Best Seller</span>' : ''}
            ${hasDiscount ? `<span class="card-badge promo"><i class="fa-solid fa-tag mr-1"></i> Diskon ${discountPct}%</span>` : ''}
            ${item.spicyLevel > 0 ? `<span class="card-badge spicy"><i class="fa-solid fa-pepper-hot text-red-300 mr-1"></i> Lvl ${item.spicyLevel}</span>` : ''}
          </div>

          <button 
            class="card-fav-btn ${isFav ? 'is-favorite' : ''}" 
            data-item-id="${item.id}" 
            title="${isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}"
            aria-label="Favorit"
          >
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart ${isFav ? 'text-rose-500' : ''}"></i>
          </button>
        </div>

        <div class="menu-card-body">
          <div class="menu-meta-row">
            <span class="menu-rating"><i class="fa-solid fa-star text-amber-400 mr-1"></i> ${item.rating.toFixed(1)} (${item.reviewsCount}+)</span>
            <span class="menu-preptime"><i class="fa-regular fa-clock mr-1"></i> ${item.prepTime}</span>
          </div>

          <h3 class="menu-card-title">${item.name}</h3>
          <p class="menu-card-desc">${item.description}</p>

          <div class="menu-card-footer">
            <div class="price-container">
              <span class="price-main">${formatRupiah(item.price)}</span>
              ${hasDiscount ? `<span class="price-strike">${formatRupiah(item.originalPrice)}</span>` : ''}
            </div>

            <button class="btn-add-item open-custom-btn" data-item-id="${item.id}">
              <i class="fa-solid fa-plus mr-1"></i>
              <span>Pesan</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.open-custom-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = btn.getAttribute('data-item-id');
      openCustomizationModal(itemId);
    });
  });

  container.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-fav-btn') || e.target.closest('.open-custom-btn')) return;
      const itemId = card.getAttribute('data-item-id');
      openCustomizationModal(itemId);
    });
  });

  container.querySelectorAll('.card-fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = btn.getAttribute('data-item-id');
      toggleFavorite(itemId);
    });
  });
}

export function toggleFavorite(itemId) {
  const index = AppState.favorites.indexOf(itemId);
  const item = MENU_ITEMS.find(i => i.id === itemId);

  if (index > -1) {
    AppState.favorites.splice(index, 1);
    if (item) showToast(`"${item.name}" dihapus dari favorit`, 'info');
  } else {
    AppState.favorites.push(itemId);
    if (item) showToast(`"${item.name}" disimpan ke favorit!`, 'success');
  }

  saveFavoritesToStorage();
  updateFavoritesUI();
  renderMenuGrid();
}

export function updateFavoritesUI() {
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
