<!-- ================= MODAL: LIVE ORDER TRACKER & STRUK ================= -->
<div class="modal-backdrop" id="tracker-modal-backdrop" style="display: none;">
  <div class="modal-dialog tracker-dialog" id="tracker-modal-dialog">
    <button class="modal-close-btn" id="tracker-modal-close" aria-label="Tutup Tracker">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="tracker-header">
      <div class="status-badge-live">
        <span class="live-dot pulse"></span>
        <span>Pesanan Aktif Real-Time</span>
      </div>
      <h3 class="tracker-title" id="tracker-headline">Pesanan Sedang Diproses!</h3>
      <p class="tracker-order-id">ID Pesanan: <strong id="tracker-order-id">#SAV-12345</strong></p>
    </div>

    <!-- Timeline Stepper -->
    <div class="order-stepper" id="order-stepper">
      <div class="step-item step-completed" id="step-1">
        <div class="step-icon-wrap">
          <span class="step-icon"><i class="fa-solid fa-clipboard-check"></i></span>
        </div>
        <div class="step-content">
          <h5 class="step-title">Pesanan Diterima</h5>
          <p class="step-desc">Pesanan telah diverifikasi oleh kasir & sistem.</p>
          <span class="step-time" id="step-1-time">Baru saja</span>
        </div>
      </div>

      <div class="step-item step-active" id="step-2">
        <div class="step-icon-wrap">
          <span class="step-icon"><i class="fa-solid fa-kitchen-set"></i></span>
        </div>
        <div class="step-content">
          <h5 class="step-title">Sedang Dimasak oleh Chef</h5>
          <p class="step-desc">Bahan segar sedang diracik dengan higienis.</p>
          <span class="step-time" id="step-2-time">Estimasi 12 Menit</span>
        </div>
      </div>

      <div class="step-item" id="step-3">
        <div class="step-icon-wrap">
          <span class="step-icon"><i class="fa-solid fa-motorcycle"></i></span>
        </div>
        <div class="step-content">
          <h5 class="step-title" id="step-3-title">Dalam Pengantaran</h5>
          <p class="step-desc" id="step-3-desc">Driver membawa makanan hangat menuju alamat Anda.</p>
          <span class="step-time" id="step-3-time">Menunggu penjemputan</span>
        </div>
      </div>

      <div class="step-item" id="step-4">
        <div class="step-icon-wrap">
          <span class="step-icon"><i class="fa-solid fa-circle-check"></i></span>
        </div>
        <div class="step-content">
          <h5 class="step-title" id="step-4-title">Tiba di Tujuan & Selesai</h5>
          <p class="step-desc">Selamat menikmati hidangan lezat Savoria Bistro!</p>
          <span class="step-time" id="step-4-time">Estimasi 25 Menit</span>
        </div>
      </div>
    </div>

    <!-- Quick Fast-Forward Simulation Controller -->
    <div class="sim-speed-box">
      <small><i class="fa-regular fa-lightbulb text-amber-500 mr-1"></i> <em>Simulasi otomatis berlangsung setiap beberapa detik, atau klik tombol di bawah untuk mempercepat status:</em></small>
      <button class="btn btn-xs btn-glass" id="fast-forward-step-btn">
        <i class="fa-solid fa-forward-step mr-1"></i>
        <span>Percepat ke Status Berikutnya</span>
      </button>
    </div>

    <!-- Printable Digital Receipt -->
    <div class="receipt-container" id="printable-receipt">
      <div class="receipt-header">
        <div class="receipt-logo"><i class="fa-solid fa-bowl-food mr-1"></i> SAVORIA BITES & BISTRO</div>
        <p class="receipt-loc">Jl. Boulevard Kuliner No. 88, Surabaya</p>
        <div class="receipt-dashed"></div>
      </div>

      <div class="receipt-meta">
        <div class="receipt-meta-row">
          <span>No. Transaksi:</span>
          <strong id="receipt-id">#SAV-0000</strong>
        </div>
        <div class="receipt-meta-row">
          <span>Waktu:</span>
          <span id="receipt-date">21/09/2026, 12:00</span>
        </div>
        <div class="receipt-meta-row">
          <span>Pelanggan:</span>
          <span id="receipt-customer">Kristina</span>
        </div>
        <div class="receipt-meta-row">
          <span>Metode / Layanan:</span>
          <span id="receipt-type">Delivery (QRIS)</span>
        </div>
        <div class="receipt-meta-row">
          <span>Tujuan / Meja:</span>
          <span id="receipt-address">Jl. Mawar No. 12</span>
        </div>
        <div class="receipt-dashed"></div>
      </div>

      <!-- Receipt Item List -->
      <div class="receipt-items-list" id="receipt-items-list">
        <!-- Rendered via JS -->
      </div>

      <div class="receipt-dashed"></div>

      <div class="receipt-pricing">
        <div class="rc-row">
          <span>Subtotal:</span>
          <span id="rc-subtotal">Rp 0</span>
        </div>
        <div class="rc-row rc-discount" id="rc-discount-row" style="display: none;">
          <span>Diskon Kupon:</span>
          <span id="rc-discount">-Rp 0</span>
        </div>
        <div class="rc-row">
          <span>Ongkir:</span>
          <span id="rc-shipping">Rp 12.000</span>
        </div>
        <div class="rc-row">
          <span>Pajak Resto (10%):</span>
          <span id="rc-tax">Rp 0</span>
        </div>
        <div class="receipt-dashed"></div>
        <div class="rc-row rc-grand">
          <strong>TOTAL BAYAR:</strong>
          <strong id="rc-grand-total">Rp 0</strong>
        </div>
      </div>

      <div class="receipt-footer">
        <p>*** LUNAS / PAID ***</p>
        <p>Terima kasih telah memesan di Savoria!</p>
        <p>Kritik & Saran WA: 0812-3456-7890</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="tracker-actions">
      <button class="btn btn-secondary" id="print-receipt-btn">
        <i class="fa-solid fa-print mr-1"></i>
        <span>Cetak Struk Transaksi</span>
      </button>
      <button class="btn btn-primary" id="order-again-btn">
        <i class="fa-solid fa-bag-shopping mr-1"></i>
        <span>Pesan Menu Lain</span>
      </button>
    </div>
  </div>
</div>
