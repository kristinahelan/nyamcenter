<!-- ================= MENU CATALOG & FILTERS PARTIAL ================= -->
<section class="menu-section container" id="menu-catalog">
  <!-- Filter Bar -->
  <div class="catalog-header">
    <div class="catalog-title-wrap">
      <h2 class="section-title">Daftar Menu Pilihan</h2>
      <p class="section-subtitle">Dibuat dari bahan segar berkualitas setiap hari</p>
    </div>

    <!-- Sort and Quick Filters -->
    <div class="filter-controls">
      <div class="sort-select-wrapper">
        <label for="sort-select" class="sort-label">Urutkan:</label>
        <select id="sort-select" class="sort-select">
          <option value="popular">Paling Populer 🔥</option>
          <option value="rating">Rating Tertinggi ⭐</option>
          <option value="price-asc">Harga Terendah (Termurah)</option>
          <option value="price-desc">Harga Tertinggi</option>
        </select>
      </div>

      <div class="filter-toggles">
        <label class="toggle-pill" id="filter-promo-label">
          <input type="checkbox" id="filter-promo-checkbox">
          <i class="fa-solid fa-tag text-red-500 mr-1"></i>
          <span>Ada Promo</span>
        </label>
        <label class="toggle-pill" id="filter-bestseller-label">
          <input type="checkbox" id="filter-bestseller-checkbox">
          <i class="fa-solid fa-star text-amber-500 mr-1"></i>
          <span>Best Seller</span>
        </label>
      </div>
    </div>
  </div>

  <!-- Categories Pills -->
  <div class="categories-scroll" id="categories-container" role="tablist">
    <!-- Rendered via JS -->
  </div>

  <!-- Menu Grid Cards -->
  <div class="menu-grid" id="menu-grid">
    <!-- Rendered via JS -->
  </div>

  <!-- Empty State -->
  <div class="empty-state" id="empty-state" style="display: none;">
    <div class="empty-icon text-muted">
      <i class="fa-solid fa-utensils"></i>
      <i class="fa-solid fa-magnifying-glass ml-2"></i>
    </div>
    <h3>Menu tidak ditemukan</h3>
    <p>Coba gunakan kata kunci lain atau bersihkan filter pencarian Anda.</p>
    <button class="btn btn-secondary" id="reset-filter-btn">
      <i class="fa-solid fa-rotate-left mr-1"></i>
      <span>Reset Pencarian</span>
    </button>
  </div>
</section>
