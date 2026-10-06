# 🏛️ Pemodelan Berorientasi Objek & UML — Kristina Ina Helan

**Disusun Oleh:** Kristina Ina Helan (NIM: 25091397085)  
**Topik:** Sequence Diagram dan Class Diagram Sistem Pemesanan Makanan Nyam Center  

---

## 1. Sequence Diagram

### 1.1 Sequence Diagram: Pemesanan Multi-Tenant & Pembayaran QRIS
Diagram ini memodelkan interaksi dinamis antara **Pengunjung**, antarmuka web (**UI Client**), controller aplikasi (**OrderController**, **PaymentController**), **Database**, dan **Payment Gateway**.

```mermaid
sequenceDiagram
    autonumber
    actor Pengunjung as 👤 Pengunjung
    participant View as 📱 UI/Blade View
    participant OrderCtrl as ⚙️ OrderController
    participant PayCtrl as 💳 PaymentController
    participant Gateway as 🌐 Payment Gateway (QRIS)
    participant DB as 🗄️ Database (MySQL)
    actor Tenant as 👨‍🍳 Dashboard Stand

    Pengunjung->>View: 1. Scan QR Meja & Buka Menu
    View->>OrderCtrl: 2. GET /menu?table_id=8
    OrderCtrl->>DB: 3. Query Menu & Kategori Aktif
    DB-->>OrderCtrl: 4. Data Menu List
    OrderCtrl-->>View: 5. Render Katalog Menu & Info Meja
    
    Pengunjung->>View: 6. Pilih Varian, Topping, & Add to Cart
    Pengunjung->>View: 7. Checkout (Nama, WhatsApp, Metode: QRIS)
    View->>OrderCtrl: 8. POST /checkout (Payload Cart Multi-Stand)
    
    OrderCtrl->>DB: 9. Simpan Orders (Status: PENDING)
    OrderCtrl->>DB: 10. Simpan OrderItems per Tenant Stand
    OrderCtrl->>PayCtrl: 11. Inisialisasi Transaksi Pembayaran
    
    PayCtrl->>Gateway: 12. Request Dynamic QRIS String
    Gateway-->>PayCtrl: 13. Return QR Code Payload & Expiry
    PayCtrl->>DB: 14. Simpan Record Payments
    PayCtrl-->>View: 15. Tampilkan Modal QRIS & Countdown Timer
    
    Pengunjung->>Gateway: 16. Scan & Bayar via Mobile Banking / E-Wallet
    Gateway->>PayCtrl: 17. Webhook / Callback (Settlement SUCCESS)
    PayCtrl->>DB: 18. Update Payments status = SETTLEMENT
    PayCtrl->>DB: 19. Update Orders status = PAID
    
    PayCtrl->>Tenant: 20. Push Notifikasi Pesanan Masuk ke Dapur Stand
    PayCtrl-->>View: 21. Broadcast Status Pembayaran Berhasil
    View->>View: 22. Buka Live Order Tracker & Render Digital Receipt
```

### 1.2 Sequence Diagram: Manajemen Menu & Stok oleh Pemilik Stand
```mermaid
sequenceDiagram
    autonumber
    actor Tenant as 👨‍🍳 Pemilik Stand
    participant View as 💻 Dashboard Tenant UI
    participant MenuCtrl as ⚙️ TenantMenuController
    participant DB as 🗄️ Database

    Tenant->>View: 1. Login Akun Stand
    View->>MenuCtrl: 2. POST /tenant/login (Credentials)
    MenuCtrl->>DB: 3. Verifikasi User & Tenant Role
    DB-->>MenuCtrl: 4. Auth Success & Tenant Profile
    MenuCtrl-->>View: 5. Tampilkan Dashboard Manajemen Menu

    Tenant->>View: 6. Tambah / Ubah Menu (Nama, Harga, Porsi, Topping, Foto)
    View->>MenuCtrl: 7. POST /tenant/menu/store (Form Data)
    MenuCtrl->>DB: 8. Insert / Update Menus & MenuOptions
    DB-->>MenuCtrl: 9. Data Saved Successfully
    MenuCtrl-->>View: 10. Notifikasi "Menu Berhasil Disimpan"

    Tenant->>View: 11. Toggle Status Menu (Tersedia -> Sold Out)
    View->>MenuCtrl: 12. PATCH /tenant/menu/{id}/toggle-availability
    MenuCtrl->>DB: 13. Update Menus is_available = FALSE
    DB-->>MenuCtrl: 14. Status Updated
    MenuCtrl-->>View: 15. Real-time Status Badge Berubah "Sold Out"
```

---

## 2. Class Diagram
Class Diagram memodelkan struktur kelas logika berbasis konsep Object-Oriented Programming (OOP) dan arsitektur Model-View-Controller (MVC) di lingkungan Laravel.

```mermaid
classDiagram
    class User {
        +BigInteger id
        +String name
        +String email
        +String password
        +String role
        +DateTime created_at
        +login(email, password) Boolean
        +logout() Void
    }

    class Tenant {
        +BigInteger id
        +BigInteger user_id
        +String stand_name
        +String stand_number
        +String phone
        +String logo_image
        +Boolean is_active
        +getMenuList() List~Menu~
        +getIncomingOrders() List~OrderItem~
    }

    class Table {
        +BigInteger id
        +String table_number
        +String qr_code_path
        +String status
        +generateQRCode() String
    }

    class Category {
        +BigInteger id
        +String name
        +String slug
        +String icon
    }

    class Menu {
        +BigInteger id
        +BigInteger tenant_id
        +BigInteger category_id
        +String name
        +String description
        +Decimal price
        +Decimal original_price
        +String image
        +Boolean is_available
        +Boolean is_best_seller
        +Boolean is_promo
        +Integer spicy_level
        +calculateDiscount() Decimal
        +toggleStatus() Void
    }

    class MenuOption {
        +BigInteger id
        +BigInteger menu_id
        +String option_type
        +String option_name
        +Decimal extra_price
    }

    class Voucher {
        +BigInteger id
        +String code
        +String title
        +String discount_type
        +Decimal discount_value
        +Decimal min_spend
        +Decimal max_discount
        +validateVoucher(subtotal) Boolean
        +calculateDiscount(subtotal) Decimal
    }

    class CartItem {
        +String signature
        +BigInteger menu_id
        +String portion_name
        +String spicy_level
        +List~MenuOption~ toppings
        +String notes
        +Integer quantity
        +Decimal unit_price
        +getSubtotal() Decimal
    }

    class Order {
        +BigInteger id
        +String order_number
        +BigInteger table_id
        +BigInteger voucher_id
        +String customer_name
        +String customer_phone
        +String order_type
        +Decimal subtotal
        +Decimal discount_amount
        +Decimal tax_amount
        +Decimal shipping_fee
        +Decimal grand_total
        +String status
        +DateTime created_at
        +calculateTotals() Void
        +updateStatus(newStatus) Void
    }

    class OrderItem {
        +BigInteger id
        +BigInteger order_id
        +BigInteger menu_id
        +BigInteger tenant_id
        +Integer quantity
        +Decimal unit_price
        +Decimal subtotal
        +String portion_choice
        +String spicy_choice
        +String toppings_json
        +String item_notes
        +String item_status
        +updateItemStatus(status) Void
    }

    class Payment {
        +BigInteger id
        +BigInteger order_id
        +String transaction_id
        +String payment_method
        +Decimal amount_paid
        +String payment_status
        +String qris_payload
        +DateTime paid_at
        +generateQRIS() String
        +verifySettlement() Boolean
    }

    class OrderTracking {
        +BigInteger id
        +BigInteger order_id
        +Integer step_level
        +String step_title
        +String step_description
        +DateTime logged_at
    }

    %% Relationships
    User "1" <|-- "1" Tenant : memiliki akun
    Tenant "1" *-- "many" Menu : mengelola
    Category "1" *-- "many" Menu : mengelompokkan
    Menu "1" *-- "many" MenuOption : memiliki varian
    Table "1" -- "many" Order : menampung
    Voucher "0..1" -- "many" Order : diterapkan pada
    Order "1" *-- "many" OrderItem : terdiri dari
    Tenant "1" -- "many" OrderItem : memproses pesanan
    Menu "1" -- "many" OrderItem : referensi produk
    Order "1" *-- "1" Payment : bukti transaksi
    Order "1" *-- "many" OrderTracking : mencatat progres
    CartItem ..> Menu : mereferensikan
```
