# 🧪 Rencana & Matriks Pengujian Sistem (Test Plan)

## 1. Lingkup Pengujian
Pengujian dilakukan menggunakan metode **Black Box Testing** untuk memvalidasi fungsionalitas dan kesesuaian sistem terhadap dokumen SRS.

---

## 2. Matriks Skenario Pengujian (Test Cases)

| ID Uji | Modul / Fitur | Aksi Pengujian | Hasil yang Diharapkan | Status |
| :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Scan Meja | Mengakses URL dengan parameter `?table=08` | Nomor meja terikat otomatis dan tampil pada rincian checkout. | **PASS** |
| **TC-02** | Filter Kategori | Mengklik chip kategori "Makanan Utama" / "Minuman" | Grid menu hanya menampilkan item sesuai kategori yang dipilih. | **PASS** |
| **TC-03** | Pencarian Instan | Mengetikkan kata kunci "ayam" di search bar | Menu difilter secara *real-time* tanpa memuat ulang halaman. | **PASS** |
| **TC-04** | Kustomisasi Menu | Memilih porsi Jumbo (+15k) dan ekstra topping | Kalkulasi harga unit dan total modal bertambah sesuai extra price. | **PASS** |
| **TC-05** | Multi-Tenant Cart | Menambahkan menu dari Stand A dan Stand B | Keranjang menampung kedua menu dan menghitung subtotal gabungan. | **PASS** |
| **TC-06** | Validasi Voucher | Memasukkan kode voucher `SAVORHEMAT` | Potongan harga Rp 20.000 terpotong jika subtotal $\ge$ Rp 50.000. | **PASS** |
| **TC-07** | QRIS Countdown | Memilih pembayaran QRIS | Modal QRIS muncul dengan hitung mundur 5 menit dan QR SVG dinamis. | **PASS** |
| **TC-08** | Live Tracking | Mengonfirmasi pembayaran sukses | Stepper berubah dari Step 1 ke Step 2, 3, dan 4 secara otomatis. | **PASS** |
| **TC-09** | Cetak Struk | Menekan tombol "Cetak Struk Transaksi" | Browser membuka dialog print dengan layout receipt bersih. | **PASS** |
| **TC-10** | Toggle Dark Mode | Mengklik tombol switch tema di navbar | Variabel CSS berganti antara mode gelap dan terang secara instan. | **PASS** |
