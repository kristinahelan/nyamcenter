# 📐 Pemodelan Basis Data & UML — Riska Nuraini

**Disusun Oleh:** Riska Nuraini (NIM: 25091397102)  
**Topik:** Entity Relationship Diagram (ERD), Use Case Diagram, dan Activity Diagram  

---

## 1. Entity Relationship Diagram (ERD)
ERD memodelkan struktur data relasional pada sistem **Nyam Center** yang mendukung fitur *multi-tenant pujasera*.

```mermaid
erDiagram
    USERS ||--o{ TENANTS : "mengelola"
    USERS {
        bigint id PK
        string name
        string email UK
        string password
        enum role "admin, tenant"
        datetime created_at
    }

    TABLES ||--o{ ORDERS : "memiliki"
    TABLES {
        bigint id PK
        string table_number UK
        string qr_code_path
        enum status "available, occupied"
        datetime created_at
    }

    TENANTS ||--o{ MENUS : "memiliki"
    TENANTS ||--o{ ORDER_ITEMS : "memproses"
    TENANTS {
        bigint id PK
        bigint user_id FK
        string stand_name
        string stand_number
        string phone
        string logo_image
        boolean is_active
        datetime created_at
    }

    CATEGORIES ||--o{ MENUS : "mengelompokkan"
    CATEGORIES {
        bigint id PK
        string name
        string slug UK
        string icon
    }

    MENUS ||--o{ MENU_OPTIONS : "memiliki varian"
    MENUS ||--o{ ORDER_ITEMS : "dipesan dalam"
    MENUS {
        bigint id PK
        bigint tenant_id FK
        bigint category_id FK
        string name
        text description
        decimal price
        decimal original_price
        string image
        boolean is_available
        boolean is_best_seller
        boolean is_promo
        int spicy_level
        datetime created_at
    }

    MENU_OPTIONS {
        bigint id PK
        bigint menu_id FK
        enum option_type "portion, topping, spicy"
        string option_name
        decimal extra_price
    }

    VOUCHERS ||--o{ ORDERS : "digunakan pada"
    VOUCHERS {
        bigint id PK
        string code UK
        string title
        enum discount_type "fixed, percent, delivery"
        decimal discount_value
        decimal min_spend
        decimal max_discount
        date valid_until
        boolean is_active
    }

    ORDERS ||--|{ ORDER_ITEMS : "terdiri dari"
    ORDERS ||--|| PAYMENTS : "memiliki bukti"
    ORDERS ||--o{ ORDER_TRACKING : "memiliki histori"
    ORDERS {
        bigint id PK
        string order_number UK
        bigint table_id FK
        bigint voucher_id FK
        string customer_name
        string customer_phone
        enum order_type "dinein, takeaway, delivery"
        text notes
        decimal subtotal
        decimal discount_amount
        decimal tax_amount
        decimal shipping_fee
        decimal grand_total
        enum status "pending, paid, processing, completed, cancelled"
        datetime created_at
    }

    ORDER_ITEMS {
        bigint id PK
        bigint order_id FK
        bigint menu_id FK
        bigint tenant_id FK
        int quantity
        decimal unit_price
        decimal subtotal
        string portion_choice
        string spicy_choice
        text toppings_json
        text item_notes
        enum item_status "waiting, cooking, ready, served"
    }

    PAYMENTS {
        bigint id PK
        bigint order_id FK
        string transaction_id UK
        enum payment_method "qris, ewallet, va, cash"
        decimal amount_paid
        enum payment_status "unpaid, settlement, expired, failed"
        string qris_payload
        datetime paid_at
    }

    ORDER_TRACKING {
        bigint id PK
        bigint order_id FK
        int step_level
        string step_title
        string step_description
        datetime logged_at
    }
```

---

## 2. Use Case Diagram
Use Case Diagram mendeskripsikan interaksi antara aktor (**Pengunjung**, **Pemilik Stand**, **Admin Pengelola**, dan **Payment Gateway**) dengan fungsionalitas sistem.

```mermaid
graph LR
    %% Aktor
    subgraph Aktor
        CUST["👤 Pengunjung"]
        TNT["👨‍🍳 Pemilik Stand"]
        ADM["🏢 Admin Pengelola"]
        PG["💳 Payment Gateway"]
    end

    %% Batasan Sistem
    subgraph Sistem Informasi Nyam Center
        UC1(["Scan QR Meja & Buka Menu"])
        UC2(["Filter Menu & Pencarian"])
        UC3(["Kustomisasi Menu & Add to Cart"])
        UC4(["Gunakan Voucher Promo"])
        UC5(["Checkout & Bayar"])
        UC6(["Bayar via QRIS Dinamis"])
        UC7(["Pantau Live Order Tracker"])
        UC8(["Cetak Struk Digital"])
        
        UC9(["Login / Logout Stand"])
        UC10(["Kelola Menu & Stok (CRUD)"])
        UC11(["Terima Pesanan Masuk (KDS)"])
        UC12(["Update Progres Status Masak"])
        UC13(["Lihat Laporan Penjualan Stand"])

        UC14(["Kelola Data Master Stand UMKM"])
        UC15(["Generate & Cetak QR Meja"])
        UC16(["Kelola Voucher Promo Pujasera"])
        UC17(["Lihat Rekap Transaksi Global"])
    end

    %% Relasi Pengunjung
    CUST --> UC1
    CUST --> UC2
    CUST --> UC3
    CUST --> UC4
    CUST --> UC5
    CUST --> UC7
    CUST --> UC8

    %% Include / Extend
    UC5 -.->|<<include>>| UC6
    UC6 <-->|Verifikasi Settlement| PG

    %% Relasi Pemilik Stand
    TNT --> UC9
    TNT --> UC10
    TNT --> UC11
    TNT --> UC12
    TNT --> UC13

    %% Relasi Admin
    ADM --> UC9
    ADM --> UC14
    ADM --> UC15
    ADM --> UC16
    ADM --> UC17
```

---

## 3. Activity Diagram

### 3.1 Activity Diagram: Alur Pemesanan & Pembayaran Pengunjung
```mermaid
stateDiagram-v2
    [*] --> ScanQRMeja: Pengunjung Duduk di Meja & Scan QR
    ScanQRMeja --> ValidasiMeja: Sistem Membaca ID Meja
    
    state ValidasiMeja <<choice>>
    ValidasiMeja --> TampilKatalog: Meja Valid
    ValidasiMeja --> ScanQRMeja: Meja Tidak Valid / Error

    TampilKatalog --> PilihMenu: Eksplorasi Menu dari Aneka Stand
    PilihMenu --> Kustomisasi: Pilih Porsi, Level Pedas, Topping & Catatan
    Kustomisasi --> TambahKeranjang: Tambahkan ke Keranjang
    TambahKeranjang --> TambahLagi: Mau pesan menu stand lain?

    state TambahLagi <<choice>>
    TambahLagi --> TampilKatalog: Ya, Pilih Menu Stand Lain
    TambahLagi --> BukaCart: Tidak, Masuk ke Keranjang

    BukaCart --> InputKupon: Terapkan Kupon Promo (Opsional)
    InputKupon --> FormCheckout: Isi Nama, WhatsApp, & Tipe Layanan
    FormCheckout --> PilihMetodeBayar: Pilih Metode (QRIS/Cash)

    state PilihMetodeBayar <<choice>>
    PilihMetodeBayar --> TampilQRIS: Pilih QRIS Dinamis
    PilihMetodeBayar --> LangsungProses: Pilih Tunai / Kasir

    TampilQRIS --> ScanBayar: Pengunjung Scan via Mobile Banking / E-Wallet
    ScanBayar --> Settlement: Payment Gateway Konfirmasi Lunas
    Settlement --> NotifikasiSukses: Pembayaran Sukses Terverifikasi
    LangsungProses --> NotifikasiSukses: Order Diterima Kasir

    NotifikasiSukses --> LiveTracking: Sistem Mengarahkan ke Live Tracker
    LiveTracking --> CetakStruk: Lihat & Cetak Struk Transaksi Digital
    CetakStruk --> [*]
```

### 3.2 Activity Diagram: Alur Pemrosesan Pesanan oleh Pemilik Stand (Dapur)
```mermaid
stateDiagram-v2
    [*] --> StandStandby: Pemilik Stand Login di Dashboard Dapur
    StandStandby --> TerimaOrderBaru: Notifikasi Tiket Pesanan Masuk
    
    TerimaOrderBaru --> CekBahan: Periksa Ketersediaan Bahan & Rincian Kustomisasi
    
    state CekBahan <<choice>>
    CekBahan --> TolakOrder: Bahan Habis / Stand Tutup
    CekBahan --> KonfirmasiMasak: Bahan Lengkap

    TolakOrder --> UpdateBatal: Sistem Ubah Status Batal & Notifikasi Pelanggan
    UpdateBatal --> [*]

    KonfirmasiMasak --> KlikSedangDimasak: Klik Tombol "Sedang Dimasak"
    KlikSedangDimasak --> BroadcastCustomer1: Sistem Update Stepper Pengunjung ke Step 2
    
    BroadcastCustomer1 --> ProsesMemasak: Chef Memasak Makanan Sesuai Catatan
    ProsesMemasak --> SelesaiMasak: Makanan Matang & Diplating

    SelesaiMasak --> KlikSiapSaji: Klik Tombol "Siap Diantar / Siap Diambil"
    KlikSiapSaji --> BroadcastCustomer2: Sistem Update Stepper Pengunjung ke Step 3/4
    BroadcastCustomer2 --> SelesaiTransaksi: Makanan Diterima Pengunjung
    SelesaiTransaksi --> [*]
```
