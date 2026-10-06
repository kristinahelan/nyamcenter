# 📊 Data Flow Diagram (DFD) — Anisa Dini Septianda (ASA)

**Disusun Oleh:** Anisa Dini Septianda (NIM: 25091397092)  
**Topik:** Pemodelan Aliran Data Terstruktur Sistem Pemesanan Makanan Nyam Center  

---

## 1. DFD Level 0 (Context Diagram)
Diagram Konteks menggambarkan batasan sistem secara menyeluruh dan interaksi antara **Sistem Informasi Nyam Center** dengan entitas eksternal: **Pengunjung**, **Pemilik Stand (Tenant)**, **Admin Pengelola**, dan **Payment Gateway**.

```mermaid
graph TD
    %% Entitas Eksternal
    CUST["👤 Pengunjung (Pelanggan)"]
    TNT["👨‍🍳 Pemilik Stand (Tenant UMKM)"]
    ADM["🏢 Admin Pengelola Pujasera"]
    PG["💳 Payment Gateway (QRIS/Bank)"]

    %% Sistem Utama
    SYS(("0.0<br/>SISTEM INFORMASI<br/>PEMESANAN MAKANAN<br/>NYAM CENTER"))

    %% Aliran Data Pengunjung
    CUST -->|1. Scan QR Meja & Pilih Item| SYS
    CUST -->|2. Data Checkout & Bukti Bayar| SYS
    SYS -->|3. Katalog Menu & Info Stand| CUST
    SYS -->|4. Info QRIS & Notifikasi Status Pesanan| CUST
    SYS -->|5. Struk Transaksi Digital| CUST

    %% Aliran Data Pemilik Stand
    TNT -->|6. Kredensial Login & Kelola Menu/Stok| SYS
    TNT -->|7. Update Status Memasak Pesanan| SYS
    SYS -->|8. Notifikasi Pesanan Masuk per Stand| TNT
    SYS -->|9. Rekap Penjualan Harian Stand| TNT

    %% Aliran Data Admin
    ADM -->|10. Data Master Meja & Stand Tenant| SYS
    ADM -->|11. Konfigurasi Voucher Promo & Pajak| SYS
    SYS -->|12. Laporan Transaksi Global & Bagi Hasil| ADM
    SYS -->|13. QR Code Meja Ter-generate| ADM

    %% Aliran Data Payment Gateway
    SYS -->|14. Request Dynamic QRIS/VA Payment| PG
    PG -->|15. Webhook Callback Status Settlement Lunas| SYS
```

---

## 2. DFD Level 1 (Proses Utama Sistem)
DFD Level 1 memecah sistem utama menjadi 6 proses inti yang berinteraksi dengan 6 data store:

```mermaid
graph TD
    %% Entitas
    CUST["👤 Pengunjung"]
    TNT["👨‍🍳 Pemilik Stand"]
    ADM["🏢 Admin"]
    PG["💳 Payment Gateway"]

    %% Data Stores
    D1[("D1 Data Meja & QR")]
    D2[("D2 Data Stand & User")]
    D3[("D3 Data Menu & Kategori")]
    D4[("D4 Data Voucher & Promo")]
    D5[("D5 Data Transaksi & Order")]
    D6[("D6 Data Tracking & Log")]

    %% Proses Utama
    P1(("1.0<br/>Manajemen Meja<br/>& Autentikasi"))
    P2(("2.0<br/>Katalog &<br/>Kelola Menu"))
    P3(("3.0<br/>Pemesanan &<br/>Cart Multi-Stand"))
    P4(("4.0<br/>Pembayaran &<br/>Verifikasi QRIS"))
    P5(("5.0<br/>Kitchen Dispatcher<br/>& Live Tracker"))
    P6(("6.0<br/>Pelaporan &<br/>Rekapitulasi"))

    %% Interaksi Proses 1.0
    ADM -->|Kelola Data Meja & Stand| P1
    TNT -->|Login Akun Stand| P1
    P1 <-->|Read/Write Meja & QR| D1
    P1 <-->|Read/Write Akun| D2

    %% Interaksi Proses 2.0
    TNT -->|CRUD Menu & Update Stok| P2
    P2 <-->|Read/Write Menu & Kategori| D3
    P2 -->|Tampilkan Daftar Menu| CUST

    %% Interaksi Proses 3.0
    CUST -->|Scan QR Meja & Pilih Menu| P3
    D1 -->|Validasi No. Meja| P3
    D3 -->|Info Harga & Kustomisasi| P3
    D4 -->|Validasi Kode Kupon| P3
    P3 -->|Simpan Draft Pesanan| D5

    %% Interaksi Proses 4.0
    CUST -->|Submit Checkout| P4
    P4 -->|Request Dynamic QRIS| PG
    PG -->|Notifikasi Sukses Bayar| P4
    P4 -->|Update Status LUNAS| D5
    P4 -->|Kirim Struk Digital| CUST

    %% Interaksi Proses 5.0
    D5 -->|Distribusi Item ke Stand Terkait| P5
    P5 -->|Notifikasi Tiket Pesanan Masuk| TNT
    TNT -->|Update Status Dimasak / Siap| P5
    P5 -->|Simpan Status Terkini| D6
    P5 -->|Kirim Live Stepper Status| CUST

    %% Interaksi Proses 6.0
    D5 & D6 & D2 -->|Kompilasi Data Transaksi| P6
    P6 -->|Laporan Omzet per Stand| TNT
    P6 -->|Laporan Rekap Global Pujasera| ADM
```

---

## 3. DFD Level 2 (Dekomposisi Proses Kunci)

### 3.1 DFD Level 2 — Proses 3.0 (Alur Pemesanan & Cart)
```mermaid
graph TD
    CUST["👤 Pengunjung"]
    D1[("D1 Data Meja")]
    D3[("D3 Data Menu")]
    D4[("D4 Data Voucher")]
    D5[("D5 Data Transaksi")]

    P31(("3.1<br/>Inisialisasi Sesi Meja"))
    P32(("3.2<br/>Kustomisasi Menu & Add to Cart"))
    P33(("3.3<br/>Kalkulasi Subtotal & Diskon Kupon"))
    P34(("3.4<br/>Checkout Order Submission"))

    CUST -->|Scan QR Code| P31
    P31 <-->|Verifikasi Meja Aktif| D1
    P31 -->|Sesi Meja Siap| CUST

    CUST -->|Pilih Porsi, Level, Topping| P32
    D3 -->|Ambil Data & Extra Price| P32
    P32 -->|Update Local Cart Session| CUST

    CUST -->|Input Kode Voucher| P33
    D4 <-->|Validasi Min. Belanja & Tipe Diskon| P33
    P33 -->|Tampilkan Rincian Tagihan + Pajak PB1| CUST

    CUST -->|Konfirmasi Pesanan| P34
    P34 -->|Buat Order ID #SAV-xxxxx Status PENDING| D5
```

### 3.2 DFD Level 2 — Proses 5.0 (Kitchen Dispatcher & Live Tracking)
```mermaid
graph TD
    D5[("D5 Data Transaksi")]
    D6[("D6 Data Tracking")]
    TNT["👨‍🍳 Pemilik Stand"]
    CUST["👤 Pengunjung"]

    P51(("5.1<br/>Filter & Split Order per Tenant"))
    P52(("5.2<br/>Penerimaan Tiket Dapur"))
    P53(("5.3<br/>Update Status Pemasakan"))
    P54(("5.4<br/>Push Notifikasi ke Pelanggan"))

    D5 -->|Order Lunas Masuk| P51
    P51 -->|Tiket Menu Stand A/B/C| P52
    P52 -->|Tampilkan di Dashboard KDS Stand| TNT

    TNT -->|Klik 'Mulai Masak' / 'Selesai'| P53
    P53 -->|Perbarui Status & Timestamp| D6
    D6 -->|Ambil Perubahan Status| P54
    P54 -->|Update Real-time Timeline Stepper| CUST
```
