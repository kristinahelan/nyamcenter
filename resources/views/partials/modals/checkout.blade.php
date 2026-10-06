<!-- ================= MODAL: CHECKOUT & PEMBAYARAN ================= -->
<div class="modal-backdrop" id="checkout-modal-backdrop" style="display: none;">
  <div class="modal-dialog checkout-dialog" id="checkout-modal-dialog">
    <button class="modal-close-btn" id="checkout-modal-close" aria-label="Tutup Checkout">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="checkout-header">
      <span class="checkout-icon text-primary"><i class="fa-solid fa-bag-shopping"></i></span>
      <div>
        <h3 class="checkout-title">Formulir Pesanan & Pembayaran</h3>
        <p class="checkout-subtitle">Lengkapi detail untuk memproses pesanan lezat Anda</p>
      </div>
    </div>

    <form id="checkout-form" class="checkout-form" onsubmit="return false;">
      <!-- Tipe Pesanan -->
      <div class="form-group">
        <label class="form-label">Tipe Layanan Pesanan</label>
        <div class="order-type-radios">
          <label class="type-radio-card active">
            <input type="radio" name="orderType" value="delivery" checked>
            <div class="radio-content">
              <span class="type-icon"><i class="fa-solid fa-motorcycle"></i></span>
              <span class="type-name">Pesan Antar</span>
              <small class="type-sub">Antar ke Alamat</small>
            </div>
          </label>
          <label class="type-radio-card">
            <input type="radio" name="orderType" value="dinein">
            <div class="radio-content">
              <span class="type-icon"><i class="fa-solid fa-utensils"></i></span>
              <span class="type-name">Dine In</span>
              <small class="type-sub">Makan di Tempat</small>
            </div>
          </label>
          <label class="type-radio-card">
            <input type="radio" name="orderType" value="takeaway">
            <div class="radio-content">
              <span class="type-icon"><i class="fa-solid fa-box-archive"></i></span>
              <span class="type-name">Takeaway</span>
              <small class="type-sub">Bawa Pulang</small>
            </div>
          </label>
        </div>
      </div>

      <!-- Data Pemesan -->
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="cust-name">Nama Pemesan <span class="required">*</span></label>
          <input type="text" id="cust-name" class="form-input" placeholder="Masukkan nama Anda" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="cust-phone">Nomor WhatsApp <span class="required">*</span></label>
          <input type="tel" id="cust-phone" class="form-input" placeholder="08123456789" required>
        </div>
      </div>

      <!-- Dynamic Destination Input (Alamat atau Nomor Meja) -->
      <div class="form-group" id="destination-group">
        <label class="form-label" id="destination-label" for="cust-destination">
          Alamat Pengiriman Lengkap <span class="required">*</span>
        </label>
        <textarea 
          id="cust-destination" 
          class="form-input form-textarea" 
          rows="2" 
          placeholder="Jl. Mawar No. 12, Kel. Sukolilo, Surabaya (Patokan depan minimarket)"
          required
        ></textarea>
      </div>

      <!-- Pilihan Metode Pembayaran -->
      <div class="form-group">
        <label class="form-label">Metode Pembayaran</label>
        <div class="payment-options-grid">
          <label class="payment-method-card active">
            <input type="radio" name="paymentMethod" value="qris" checked>
            <div class="pm-content">
              <div class="pm-top">
                <span class="pm-icon text-rose-500"><i class="fa-solid fa-qrcode"></i></span>
                <strong>QRIS Dinamis</strong>
              </div>
              <small>Scan GoPay, OVO, Dana, ShopeePay, BCA, dll.</small>
            </div>
          </label>

          <label class="payment-method-card">
            <input type="radio" name="paymentMethod" value="ewallet">
            <div class="pm-content">
              <div class="pm-top">
                <span class="pm-icon text-cyan-500"><i class="fa-solid fa-wallet"></i></span>
                <strong>E-Wallet Instan</strong>
              </div>
              <small>GoPay / OVO / ShopeePay / DANA</small>
            </div>
          </label>

          <label class="payment-method-card">
            <input type="radio" name="paymentMethod" value="va">
            <div class="pm-content">
              <div class="pm-top">
                <span class="pm-icon text-amber-500"><i class="fa-solid fa-building-columns"></i></span>
                <strong>Transfer VA Bank</strong>
              </div>
              <small>BCA, Mandiri, BRI Virtual Account</small>
            </div>
          </label>

          <label class="payment-method-card">
            <input type="radio" name="paymentMethod" value="cash">
            <div class="pm-content">
              <div class="pm-top">
                <span class="pm-icon text-emerald-500"><i class="fa-solid fa-money-bill-wave"></i></span>
                <strong>Bayar Tunai / COD</strong>
              </div>
              <small>Bayar saat makanan tiba atau di kasir resto</small>
            </div>
          </label>
        </div>
      </div>

      <!-- Ringkasan Checkout Box -->
      <div class="checkout-review-card">
        <div class="review-title">Ringkasan Biaya Akhir</div>
        <div class="review-row">
          <span>Total Menu (<span id="co-item-count">0</span> item):</span>
          <span id="co-subtotal">Rp 0</span>
        </div>
        <div class="review-row" id="co-discount-row" style="display: none;">
          <span>Potongan Voucher:</span>
          <span class="discount-value" id="co-discount">-Rp 0</span>
        </div>
        <div class="review-row">
          <span>Biaya Layanan & Ongkir:</span>
          <span id="co-shipping">Rp 12.000</span>
        </div>
        <div class="review-row">
          <span>Pajak Restoran PB1 (10%):</span>
          <span id="co-tax">Rp 0</span>
        </div>
        <div class="review-row review-grand">
          <strong>Total Tagihan:</strong>
          <strong class="grand-price" id="co-total">Rp 0</strong>
        </div>
      </div>

      <!-- Tombol Konfirmasi Checkout -->
      <div class="checkout-actions">
        <button type="button" class="btn btn-secondary" id="checkout-cancel-btn">Kembali ke Keranjang</button>
        <button type="submit" class="btn btn-primary btn-submit-order" id="confirm-payment-btn">
          <span>Konfirmasi & Bayar</span>
          <span id="confirm-payment-amount">Rp 0</span>
        </button>
      </div>
    </form>
  </div>
</div>
