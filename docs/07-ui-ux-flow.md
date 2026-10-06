# 🎨 Desain Antarmuka & User Flow

## 1. User Journey Map (Pengunjung)

```mermaid
journey
    title Perjalanan Pengunjung Memesan Makanan di Nyam Center
    section Masuk & Memilih Menu
      Duduk di Meja Pujasera: 5: Pengunjung
      Pindai QR Code di Meja: 5: Pengunjung
      Buka Katalog Menu Multi-Stand: 5: Pengunjung, Sistem
      Filter Kategori & Cari Menu Favorit: 4: Pengunjung
    section Kustomisasi & Cart
      Pilih Porsi, Level Pedas & Topping: 5: Pengunjung
      Tambah ke Keranjang Gabungan: 5: Pengunjung, Sistem
      Masukkan Kode Voucher Diskon: 5: Pengunjung
    section Checkout & Bayar
      Review Tagihan & Pajak: 4: Pengunjung
      Pilih Pembayaran QRIS Dinamis: 5: Pengunjung
      Scan & Konfirmasi Sukses: 5: Pengunjung, Payment Gateway
    section Penyiapan & Sajian
      Live Tracking Status Dapur: 5: Pengunjung, Pemilik Stand
      Makanan Tiba di Meja: 5: Pengunjung
      Cetak Struk Digital: 5: Pengunjung
```

---

## 2. Struktur Desain UI (Design System Tokens)
- **Palette Warna**:
  - `Primary Accent`: Warm Amber `#f97316` & Coral `#fb7185` (Menstimulasi nafsu makan & kesan ramah).
  - `Background Dark Mode`: Deep Obsidian Navy `#090d16` & Surface `#111827`.
  - `Background Light Mode`: Crisp Clean Slate `#f8fafc` & White `#ffffff`.
- **Tipografi**: `Plus Jakarta Sans` dengan visual hierarchy yang tegas (H1 2.9rem, Title 1.45rem, Body 0.95rem).
- **Glassmorphism & Depth**: Backdrop filter blur 16px, border halus translucent, dan micro-shadow glow.
