<!-- ================= MODAL: DETAIL / KUSTOMISASI MENU ================= -->
<div class="modal-backdrop" id="custom-modal-backdrop" style="display: none;">
  <div class="modal-dialog" id="custom-modal-dialog">
    <button class="modal-close-btn" id="custom-modal-close" aria-label="Tutup">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="modal-media-header">
      <img src="" alt="" id="modal-menu-img" class="modal-menu-img">
      <div class="modal-media-overlay">
        <span class="modal-badge-category" id="modal-menu-category">Kategori</span>
        <div class="modal-rating-pill" id="modal-menu-rating">
          <i class="fa-solid fa-star text-amber-500 mr-1"></i> 4.9
        </div>
      </div>
    </div>

    <div class="modal-body">
      <h3 class="modal-menu-title" id="modal-menu-title">Nama Makanan</h3>
      <p class="modal-menu-desc" id="modal-menu-desc">Deskripsi makanan lengkap...</p>
      
      <div class="modal-price-row">
        <div class="price-display">
          <span class="current-price" id="modal-base-price">Rp 0</span>
          <span class="old-price" id="modal-old-price" style="display: none;">Rp 0</span>
        </div>
        <span class="prep-time-badge" id="modal-prep-time">
          <i class="fa-regular fa-clock mr-1"></i> 15 min
        </span>
      </div>

      <hr class="modal-divider">

      <!-- Opsi Porsi -->
      <div class="custom-section" id="portion-section">
        <label class="custom-title">
          <span>Pilihan Porsi</span>
          <span class="custom-required">Wajib (Pilih 1)</span>
        </label>
        <div class="options-group" id="portion-options-container">
          <!-- Rendered dynamically via JS -->
        </div>
      </div>

      <!-- Opsi Level Kepedasan / Rasa -->
      <div class="custom-section" id="spicy-section">
        <label class="custom-title">
          <span>Level Kepedasan / Varian</span>
          <span class="custom-required">Wajib (Pilih 1)</span>
        </label>
        <div class="options-group" id="spicy-options-container">
          <!-- Rendered dynamically via JS -->
        </div>
      </div>

      <!-- Opsi Topping Tambahan -->
      <div class="custom-section" id="topping-section">
        <label class="custom-title">
          <span>Topping Tambahan (Opsional)</span>
          <span class="custom-optional">Bisa pilih lebih dari satu</span>
        </label>
        <div class="options-group" id="topping-options-container">
          <!-- Rendered dynamically via JS -->
        </div>
      </div>

      <!-- Catatan Khusus -->
      <div class="custom-section">
        <label class="custom-title" for="modal-notes-input">
          <span>Catatan Khusus untuk Koki</span>
          <span class="custom-optional">Opsional</span>
        </label>
        <textarea 
          id="modal-notes-input" 
          class="modal-notes-input" 
          rows="2" 
          placeholder="Contoh: Jangan pakai bawang goreng, sambal dipisah ya koki..."
          maxlength="150"
        ></textarea>
      </div>
    </div>

    <div class="modal-footer">
      <div class="quantity-stepper">
        <button class="qty-btn" id="modal-qty-minus" aria-label="Kurangi jumlah">−</button>
        <span class="qty-value" id="modal-qty-display">1</span>
        <button class="qty-btn" id="modal-qty-plus" aria-label="Tambah jumlah">+</button>
      </div>

      <button class="btn btn-primary btn-add-to-cart" id="modal-confirm-add-btn">
        <span class="btn-text">Tambah ke Keranjang</span>
        <span class="btn-price-calc" id="modal-total-add-price">Rp 0</span>
      </button>
    </div>
  </div>
</div>
