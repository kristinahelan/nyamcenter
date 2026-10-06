# 🧭 Alur Proses Bisnis & BPMN (End-to-End Business Process)

**Disusun Untuk:** Alur Proses Bisnis Terpadu Sistem Pemesanan Multi-Tenant Pujasera Nyam Center  
**Tipe Diagram:** Cross-Functional Flowchart (BPMN / Swimlane Process Map)  

---

## 1. Diagram Alur Proses Lintas Peran (Swimlane BPMN Diagram)

Diagram berikut memetakan perjalanan pesanan mulai dari pelanggan di meja makan, sistem aplikasi, dapur pemilik stand, hingga kasir/pembayaran terverifikasi.

```mermaid
graph TD
    %% Swimlane Pengunjung
    subgraph SwimPengunjung["👤 Pengunjung (Mahasiswa/Pelanggan)"]
        S1(["Mulai: Duduk di Meja"]) --> S2["Scan QR Meja / Buka Website"]
        S2 --> S3["Pilih Menu dari Berbagai Stand"]
        S3 --> S4["Kustomisasi Varian, Level & Catatan"]
        S4 --> S5["Cek Keranjang & Masukkan Kupon Promo"]
        S5 --> S6["Isi Data Pemesan & Pilih Metode Bayar"]
        S6 --> S7{"Pilih Metode Bayar?"}
        S7 -->|QRIS / E-Wallet| S8["Scan Dynamic QRIS Midtrans"]
        S7 -->|Bayar Tunai| S9["Bayar di Kasir / Stand"]
        S10["Pantau Live Tracker di Smartphone"] --> S11["Pesanan Siap: Ambil Makanan / Diantar"]
        S11 --> S12(["Selesai: Menikmati Makanan"])
    end

    %% Swimlane Sistem Aplikasi
    subgraph SwimSistem["⚙️ Sistem Informasi Nyam Center"]
        SYS1["Validasi Nomor Meja & Stok Real-time"]
        SYS2["Hitung Subtotal + Pajak PB1 10% - Diskon"]
        SYS3["Generate Invoice & Request QRIS Midtrans"]
        SYS4["Terima Callback Webhook QRIS (LUNAS)"]
        SYS5["Split Order Item ke Stand Terkait"]
        SYS6["Push Notifikasi Tiket Pesanan Baru ke Stand"]
        SYS7["Update Live Status Tracker ke Pengunjung"]
    end

    %% Swimlane Stand UMKM (Tenant)
    subgraph SwimTenant["👨‍🍳 Pemilik Stand (Tenant UMKM)"]
        T1["Terima Bunyi Notifikasi & Tiket Dapur"]
        T2["Klik Tombol 'Mulai Memasak'"]
        T3["Proses Memasak Makanan"]
        T4["Klik Tombol 'Makanan Siap Saji'"]
        T5["Serahkan Pesanan ke Pelanggan"]
    end

    %% Relasi Aliran Antar Swimlane
    S2 --> SYS1
    SYS1 --> S3
    S5 --> SYS2
    SYS2 --> S6
    S8 --> SYS3
    SYS3 --> SYS4
    S9 --> SYS4
    SYS4 --> SYS5
    SYS5 --> SYS6
    SYS6 --> T1
    T1 --> T2
    T2 --> SYS7
    SYS7 --> S10
    T2 --> T3
    T3 --> T4
    T4 --> SYS7
    SYS7 --> S11
    T4 --> T5
    T5 --> S12
```

---

## 2. Matriks Tanggung Jawab Operasional (RACI Matrix)

| Aktivitas Operasional | Pengunjung | Stand (Tenant) | Admin Pujasera | Sistem Otomatis |
| :--- | :---: | :---: | :---: | :---: |
| **Registrasi Stand Baru & Kelola Meja** | I | C | **A / R** | S |
| **Update Harga & Status Ketersediaan Stok** | I | **A / R** | C | S |
| **Pemilihan Menu & Multi-Cart Checkout** | **A / R** | I | I | S |
| **Verifikasi Pembayaran QRIS / Tunai** | R | I | C | **A / S** |
| **Penerimaan Tiket & Proses Memasak** | I | **A / R** | I | S |
| **Pengambilan / Pengantaran Makanan** | **R** | **R** | I | S |
| **Laporan Bagi Hasil & Rekap Omzet Harian** | I | R | **A** | **S** |

*Keterangan: **R** = Responsible, **A** = Accountable, **C** = Consulted, **I** = Informed, **S** = System Executed.*
