# 📋 Ruang Lingkup & Analisis Stakeholder

## 1. Ruang Lingkup Produk (*Product Scope*)
Platform **Nyam Center** mencakup fungsionalitas berikut:
- **In-Scope:**
  - Pemindaian QR Code meja dengan parameter ID Meja otomatis.
  - Penjelajahan menu berdasarkan kategori dan stand tenant UMKM.
  - Kustomisasi menu (porsi, level pedas, topping tambahan, catatan khusus koki).
  - Keranjang belanja gabungan multi-tenant.
  - Simulasi dan verifikasi pembayaran QRIS, E-Wallet, VA, dan Tunai.
  - Dashboard tenant untuk penerimaan pesanan dan pengubahan status dapur.
  - Dashboard admin pengelola untuk pendaftaran tenant, pembuatan QR Code meja, dan rekapitulasi transaksi.
- **Out-of-Scope:**
  - Pengiriman logistik ke luar area pujasera (fokus pada *Dine-in* dan *Takeaway/Pickup* dalam area SWK).
  - Integrasi mesin EDC fisik perbankan (difokuskan pada pembayaran digital berbasis QRIS & Web API).

---

## 2. Analisis Stakeholder
Terdapat tiga aktor utama dan satu entitas eksternal yang berinteraksi dengan sistem:

| Stakeholder / Aktor | Deskripsi Peran | Kepentingan & Kebutuhan Utama |
| :--- | :--- | :--- |
| **Pengunjung (Pelanggan)** | Konsumen yang datang ke pujasera dan memesan makanan dari meja. | Alur pesan cepat (*guest checkout*), menu variatif, transparansi durasi masak, dan kemudahan pembayaran non-tunai. |
| **Pemilik Stand (Tenant UMKM)** | Pelaku usaha yang mengelola menu dan menyiapkan makanan di dapur masing-masing. | Notifikasi pesanan instan, pengaturan stok (*sold out/available*), dan kejelasan rincian kustomisasi menu dari pembeli. |
| **Pengelola Pujasera (Admin)** | Manajemen sentra kuliner yang mengatur operasional keseluruhan. | Manajemen data meja & cetak QR Code, monitoring stand aktif, dan rekapitulasi pembagian omzet/komisi. |
| **Payment Gateway / QRIS Engine** | Sistem eksternal pemrosesan transaksi keuangan. | Menerbitkan string payload QRIS dinamis dan mengirimkan *callback* status lunas (*settlement*). |

---

## 3. Matriks Peran Pengguna (*User Matrix*)

| Fitur / Modul | Pengunjung | Pemilik Stand (Tenant) | Admin Pengelola |
| :--- | :---: | :---: | :---: |
| Scan QR Meja & Jelajah Menu | ✅ | ❌ | ❌ |
| Kustomisasi Menu & Tambah ke Cart | ✅ | ❌ | ❌ |
| Checkout & Bayar (QRIS/Cash) | ✅ | ❌ | ❌ |
| Live Tracking Pesanan & Cetak Struk | ✅ | ❌ | ❌ |
| Kelola Data Menu & Stok (CRUD) | ❌ | ✅ | ❌ |
| Dapur KDS (Terima & Update Pesanan) | ❌ | ✅ | ❌ |
| Manajemen Data Stand Tenant | ❌ | ❌ | ✅ |
| Manajemen Data Meja & QR Code Generator | ❌ | ❌ | ✅ |
| Rekap Laporan Penjualan & Finansial | ❌ | ✅ *(Stand Sendiri)* | ✅ *(Semua Stand)* |
