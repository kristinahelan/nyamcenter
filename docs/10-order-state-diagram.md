# 🔄 Diagram Status & Siklus Hidup Pesanan (State Machine Diagram)

**Disusun Untuk:** Dokumentasi Alur Transisi Status Pesanan Sistem Informasi Nyam Center  
**Tipe Diagram:** UML State Machine / State Chart Diagram  

---

## 1. Siklus Hidup Pesanan (Order Lifecycle State Diagram)

Diagram berikut memodelkan seluruh status transaksi pesanan dari saat pengunjung melakukan pemesanan hingga pesanan selesai dinikmati atau dibatalkan.

```mermaid
stateDiagram-v2
    [*] --> DRAFT : Pelanggan Memilih Menu di Meja

    state DRAFT {
        [*] --> SelectingItems : Tambah Menu & Varian
        SelectingItems --> ApplyingVoucher : Input Kode Promo
        ApplyingVoucher --> CheckoutForm : Isi Nama & No. Meja
        CheckoutForm --> [*] : Konfirmasi Pesanan
    }

    DRAFT --> PENDING_PAYMENT : Submit Pesanan (Order ID Dibuat)
    
    state PENDING_PAYMENT {
        [*] --> GenerateQRIS : Request Dynamic QRIS Midtrans
        GenerateQRIS --> WaitingPayment : Tampilkan QR & Timer (15 Menit)
        WaitingPayment --> PaymentFailed : Waktu Habis / Gagal
        WaitingPayment --> PaymentSuccess : Webhook Callback Sukses
    }

    PENDING_PAYMENT --> CANCELLED : Expired / Dibatalkan
    PENDING_PAYMENT --> PAID : Pembayaran QRIS Lunas

    PAID --> KITCHEN_QUEUED : Otomatis Split Tiket ke Dapur Stand
    
    state KITCHEN_QUEUED {
        [*] --> OrderReceived : Tenant Menerima Notifikasi
        OrderReceived --> IN_COOKING : Tenant Klik "Mulai Masak"
    }

    IN_COOKING --> READY_FOR_PICKUP : Tenant Klik "Makanan Siap"
    
    state READY_FOR_PICKUP {
        [*] --> SendNotification : Push Notif ke Web/WA Pengunjung
        SendNotification --> CustomerPickup : Pengunjung Ambil ke Stand / Diantar
    }

    READY_FOR_PICKUP --> COMPLETED : Pengunjung Konfirmasi Diterima
    
    COMPLETED --> [*] : Transaksi Selesai & Masuk Rekap Omzet
    CANCELLED --> [*] : Transaksi Ditutup (Void / Refund)
```

---

## 2. Tabel Transisi State & Aktor Pemicu

| State Awal | Event / Trigger | State Tujuan | Aktor Pemicu | Keterangan Sistem |
| :--- | :--- | :--- | :--- | :--- |
| **`DRAFT`** | Klik *Checkout* | `PENDING_PAYMENT` | Pengunjung | Order ID dibuat dengan nomor faktur `#SAV-xxxxx` |
| **`PENDING_PAYMENT`** | Scan QRIS & Transfer Berhasil | `PAID` | Payment Gateway | Webhook Midtrans/QRIS mengubah status menjadi Lunas |
| **`PENDING_PAYMENT`** | Timer 15 Menit Expired | `CANCELLED` | Cron System | Stok otomatis dikembalikan jika reservasi habis |
| **`PAID`** | Dispatcher Queue | `KITCHEN_QUEUED` | System Worker | Tiket pesanan otomatis didistribusikan ke KDS stand masing-masing |
| **`KITCHEN_QUEUED`** | Klik *"Mulai Masak"* | `IN_COOKING` | Pemilik Stand | Tracker pengunjung menampilkan estimasi waktu memasak |
| **`IN_COOKING`** | Klik *"Siap Saji"* | `READY_FOR_PICKUP` | Pemilik Stand | Notifikasi buzzer/popup muncul di gawai pengunjung |
| **`READY_FOR_PICKUP`** | Klik *"Selesai"* | `COMPLETED` | Pengunjung / Tenant | Transaksi tuntas, rating stand dapat diinput |
