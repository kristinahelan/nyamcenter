<!-- ================= SLIDE-OVER CART DRAWER ================= -->
<div class="cart-backdrop" id="cart-backdrop" style="display: none;">
  <div class="cart-drawer" id="cart-drawer">
    <!-- Cart Header -->
    <div class="cart-header">
      <div class="cart-header-title">
        <span class="cart-title-icon text-primary"><i class="fa-solid fa-cart-shopping"></i></span>
        <h3>Keranjang Belanja</h3>
        <span class="cart-count-chip" id="drawer-item-count">0 item</span>
      </div>
      <button class="cart-close-btn" id="cart-close-btn" aria-label="Tutup Keranjang">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <!-- Free Delivery Progress Bar -->
    <div class="delivery-progress-card">
      <div class="progress-info">
        <span class="progress-icon text-emerald-500"><i class="fa-solid fa-motorcycle"></i></span>
        <span class="progress-text" id="free-shipping-text">Tambah Rp 25.000 lagi untuk Gratis Ongkir!</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" id="shipping-progress-fill" style="width: 0%;"></div>
      </div>
    </div>

    <!-- Cart Item List -->
    <div class="cart-items-container" id="cart-items-container">
      <!-- Rendered via JS -->
    </div>

    <!-- Voucher Promo Box -->
    <div class="cart-voucher-box">
      <div class="voucher-input-group">
        <input 
          type="text" 
          id="voucher-input" 
          placeholder="Masukkan kode voucher promo..." 
          autocomplete="off"
        >
        <button class="btn btn-secondary btn-apply-voucher" id="apply-voucher-btn">Terapkan</button>
      </div>
      <div class="applied-voucher-alert" id="applied-voucher-alert" style="display: none;">
        <div class="applied-info">
          <span class="v-tag"><i class="fa-solid fa-ticket mr-1"></i> <strong id="applied-voucher-code">KODE</strong></span>
          <span class="v-desc ml-2" id="applied-voucher-desc">Hemat Rp 20.000</span>
        </div>
        <button class="remove-voucher-btn" id="remove-voucher-btn" title="Hapus voucher">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>

    <!-- Cart Calculations -->
    <div class="cart-summary-section">
      <div class="summary-row">
        <span>Subtotal Item</span>
        <span id="summary-subtotal">Rp 0</span>
      </div>
      <div class="summary-row discount-row" id="summary-discount-row" style="display: none;">
        <span>Diskon Voucher</span>
        <span class="discount-value" id="summary-discount">-Rp 0</span>
      </div>
      <div class="summary-row">
        <span>Ongkos Kirim</span>
        <span id="summary-shipping">Rp 12.000</span>
      </div>
      <div class="summary-row">
        <span>Pajak Restoran (PB1 10%)</span>
        <span id="summary-tax">Rp 0</span>
      </div>
      <hr class="summary-divider">
      <div class="summary-row total-row">
        <span>Total Pembayaran</span>
        <span class="final-total" id="summary-grand-total">Rp 0</span>
      </div>
    </div>

    <!-- Cart Footer Actions -->
    <div class="cart-footer">
      <button class="btn btn-primary btn-block" id="proceed-to-checkout-btn">
        <span>Lanjut ke Pembayaran</span>
        <i class="fa-solid fa-arrow-right ml-1"></i>
      </button>
    </div>
  </div>
</div>
