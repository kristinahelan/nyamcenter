<!-- ================= MODAL: SIMULASI PEMBAYARAN QRIS ================= -->
<div class="modal-backdrop" id="qris-modal-backdrop" style="display: none;">
  <div class="modal-dialog qris-dialog" id="qris-modal-dialog">
    <div class="qris-card">
      <div class="qris-header">
        <div class="qris-brand-row">
          <span class="qris-logo">QRIS</span>
          <span class="qris-tag">Pembayaran Cepat Nasional</span>
        </div>
        <p class="merchant-name">MERCHANT: <strong>SAVORIA BISTRO & KULINER</strong></p>
        <p class="invoice-num">NMID: ID1020268899812 • Inv: <span id="qris-invoice-id">#SAV-88912</span></p>
      </div>

      <!-- QR Code Dynamic Render -->
      <div class="qris-code-container">
        <div class="qr-box" id="qr-display-box">
          <svg class="qr-svg-mock" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#ffffff" rx="10"/>
            <!-- Standard QR Finder Patterns -->
            <rect x="20" y="20" width="45" height="45" fill="#111827"/>
            <rect x="27" y="27" width="31" height="31" fill="#ffffff"/>
            <rect x="33" y="33" width="19" height="19" fill="#111827"/>
            
            <rect x="135" y="20" width="45" height="45" fill="#111827"/>
            <rect x="142" y="27" width="31" height="31" fill="#ffffff"/>
            <rect x="148" y="33" width="19" height="19" fill="#111827"/>

            <rect x="20" y="135" width="45" height="45" fill="#111827"/>
            <rect x="27" y="142" width="31" height="31" fill="#ffffff"/>
            <rect x="33" y="148" width="19" height="19" fill="#111827"/>

            <!-- Decorative QR Matrix Dots -->
            <g fill="#111827">
              <rect x="75" y="22" width="10" height="10"/>
              <rect x="90" y="22" width="10" height="10"/>
              <rect x="110" y="22" width="10" height="10"/>
              <rect x="75" y="38" width="15" height="10"/>
              <rect x="105" y="38" width="15" height="10"/>
              <rect x="22" y="75" width="10" height="10"/>
              <rect x="38" y="85" width="12" height="10"/>
              <rect x="55" y="75" width="10" height="15"/>
              <rect x="75" y="75" width="50" height="50" rx="8" fill="#f97316"/>
              <text x="100" y="105" font-size="24" text-anchor="middle" fill="#ffffff">🍲</text>
              <rect x="135" y="75" width="12" height="12"/>
              <rect x="155" y="85" width="20" height="10"/>
              <rect x="140" y="105" width="15" height="10"/>
              <rect x="165" y="120" width="15" height="15"/>
              <rect x="75" y="135" width="12" height="12"/>
              <rect x="95" y="140" width="25" height="10"/>
              <rect x="130" y="140" width="10" height="15"/>
              <rect x="85" y="160" width="20" height="15"/>
              <rect x="115" y="165" width="20" height="10"/>
              <rect x="145" y="160" width="30" height="15"/>
            </g>
          </svg>
        </div>
        <div class="qris-timer-pill">
          <span>Selesaikan dalam: </span>
          <strong id="qris-countdown">04:59</strong>
        </div>
      </div>

      <div class="qris-nominal-box">
        <span class="nominal-label">Total Tagihan:</span>
        <span class="nominal-value" id="qris-nominal-value">Rp 0</span>
      </div>

      <div class="qris-simulation-actions">
        <button class="btn btn-primary btn-block btn-pay-success-mock" id="mock-pay-success-btn">
          <i class="fa-solid fa-circle-check mr-1"></i>
          <span>Simulasikan Bayar Sukses</span>
        </button>
        <button class="btn btn-secondary btn-block" id="cancel-qris-btn">Batal / Ganti Metode</button>
      </div>
    </div>
  </div>
</div>
