# ⚙️ Spesifikasi Kebutuhan Sistem (SRS)

## 1. Kebutuhan Fungsional (*Functional Requirements*)

### 1.1 Modul Pengunjung / Pelanggan (FR-CUST)
- **FR-CUST-01**: Pengunjung dapat memindai QR Code di meja untuk otomatis mengikat nomor meja sesi pemesanan tanpa registrasi akun (*guest mode*).
- **FR-CUST-02**: Sistem menampilkan katalog menu yang dapat difilter berdasarkan kategori, tenant stand, promo diskon, dan rating *best seller*.
- **FR-CUST-03**: Pengunjung dapat melakukan kustomisasi menu (memilih varian porsi, level kepedasan, multi-topping, dan catatan koki).
- **FR-CUST-04**: Sistem menyediakan *centralized shopping cart* yang dapat menampung menu dari berbagai stand sekaligus dan menghitung otomatis subtotal, voucher diskon, dan pajak PB1 (10%).
- **FR-CUST-05**: Pengunjung dapat memilih metode pembayaran: QRIS Dinamis, E-Wallet, VA Bank, atau Tunai.
- **FR-CUST-06**: Pengunjung dapat melihat pelacakan status pesanan secara *real-time* (Pesanan Diterima -> Sedang Dimasak -> Siap Diantar/Diambil).
- **FR-CUST-07**: Pengunjung dapat mencetak dan mengunduh struk bukti transaksi digital.

### 1.2 Modul Pemilik Stand / Tenant (FR-TNT)
- **FR-TNT-01**: Pemilik stand dapat melakukan login aman dengan kombinasi email/username dan password.
- **FR-TNT-02**: Pemilik stand dapat melakukan operasi CRUD (Create, Read, Update, Delete) terhadap menu makanan/minuman miliknya.
- **FR-TNT-03**: Pemilik stand dapat mengubah status ketersediaan menu secara instan (*Tersedia / Habis*).
- **FR-TNT-04**: Sistem Kitchen Display System (KDS) menampilkan pesanan masuk khusus stand yang bersangkutan secara *real-time*.
- **FR-TNT-05**: Pemilik stand dapat memperbarui status pesanan dari "Diterima" menjadi "Sedang Dimasak" dan "Selesai/Siap Disajikan".
- **FR-TNT-06**: Pemilik stand dapat melihat rekapitulasi penjualan harian dan rincian item terlaris pada stand mereka.

### 1.3 Modul Administrator Pengelola (FR-ADM)
- **FR-ADM-01**: Admin dapat mengelola data tenant pujasera (mendaftarkan stand baru, verifikasi stand, mengedit data pemilik stand, dan menonaktifkan akun stand).
- **FR-ADM-02**: Admin dapat membuat (*generate*), mengedit, dan mengunduh QR Code meja unik untuk seluruh meja pujasera.
- **FR-ADM-03**: Admin dapat memantau seluruh transaksi yang sedang berlangsung di seluruh area pujasera secara *real-time*.
- **FR-ADM-04**: Admin dapat mengelola kupon diskon / voucher promo global pujasera.
- **FR-ADM-05**: Admin dapat mengekspor laporan keuangan, total omzet per stand, dan biaya administrasi/komisi ke format PDF/Excel.

---

## 2. Kebutuhan Non-Fungsional (*Non-Functional Requirements*)

| Kategori | Parameter | Spesifikasi & Batasan |
| :--- | :--- | :--- |
| **Usability** | Desain Responsif & Mobile-First | Antarmuka pengunjung dioptimalkan untuk layar ponsel (320px - 480px) dengan *tap-target* minimal 44x44px tanpa perlu zoom. |
| **Performance** | Response Time & Rendering | Waktu muat halaman pertama $\le 1.5$ detik. Render katalog menu instan melalui pemisahan modul JS & CSS. |
| **Reliability & Availability** | Jam Operasional | Sistem memiliki tingkat ketersediaan (*uptime*) minimal 99.5% selama jam operasional pujasera (09:00 - 22:00 WIB). |
| **Security** | Session Management & Proteksi Data | ID Meja dan keranjang diikat dengan sesi aman, mencegah *session hijack* atau manipulasi harga di sisi klien. Password dienkripsi dengan Bcrypt. |
| **Maintainability** | Clean Architecture | Struktur kode modular (Blade template engine, Vite build minifier, Vanilla JS modular ES6, dan CSS BEM/Utility tokens). |
