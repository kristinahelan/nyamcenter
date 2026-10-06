# 🏗️ Arsitektur Sistem & Deployment (Architecture & Deployment Diagram)

**Disusun Untuk:** Arsitektur Infrastruktur & Aliran Komponen Sistem Informasi Nyam Center  
**Tipe Diagram:** UML Deployment Diagram & Layered System Architecture  

---

## 1. Diagram Arsitektur Infrastruktur (Deployment Diagram)

Diagram berikut memodelkan bagaimana komponen perangkat lunak didistribusikan ke dalam node server, web browser pengguna, dan layanan pihak ketiga (Payment Gateway & CDN).

```mermaid
graph TD
    subgraph ClientNodes["💻 Client Nodes (Perangkat Pengguna)"]
        ClientMobile["📱 Pengunjung / Mahasiswa<br/>(Mobile Web Browser: Chrome/Safari)<br/>- Scan QR Meja & Cart<br/>- Dynamic QRIS Display<br/>- Live Order Tracker"]
        ClientTenant["💻 Stand UMKM / Tenant<br/>(Tablet / POS Browser)<br/>- Kitchen Display System (KDS)<br/>- Manajemen Stok & Menu"]
        ClientAdmin["🏢 Admin Pengelola<br/>(Desktop Browser)<br/>- Dashboard Monitoring<br/>- Master Data Meja & Stand"]
    end

    subgraph EdgeLayer["🛡️ Network & Edge Routing"]
        ReverseProxy["🌐 Nginx Web Server / HTTPS (SSL)<br/>- Reverse Proxy & Static Asset Caching<br/>- Rate Limiting & Firewall"]
        ViteBuild["⚡ Vite Asset Pipeline<br/>- Minified CSS Modules & JS Bundles"]
    end

    subgraph AppServer["⚙️ Application Server (Laravel 12 Engine)"]
        RouterMiddleware["🛡️ Kernel & Middleware<br/>- Authenticate, RoleCheck<br/>- VerifyCsrf, CorsFilter"]
        Controllers["🕹️ Controllers Layer<br/>- MenuCatalogController<br/>- OrderCheckoutController<br/>- PaymentCallbackController<br/>- KitchenDispatcherController"]
        Services["🧠 Business Logic & Services<br/>- Pricing & Tax PB1 Service<br/>- Multi-Stand Cart Engine<br/>- Midtrans QRIS Service"]
        QueueWorker["⏱️ Background Worker<br/>- Real-time Polling / Event Listener<br/>- Notification Dispatcher"]
    end

    subgraph DataStorage["🗄️ Database & Cache Layer"]
        MySQL[("🗄️ MySQL Database Engine<br/>- InnoDB Relational Tables<br/>- Soft Deletes & Foreign Keys")]
        FileStorage["📁 Storage / Public Disk<br/>- Menu Images & Stand Logos<br/>- Dynamic QR Code SVGs"]
    end

    subgraph ExternalServices["🌐 External Cloud Services"]
        Midtrans["💳 Midtrans Payment Gateway<br/>- Dynamic QRIS Engine<br/>- Real-time Webhook Notification"]
        CDN["📦 Cloud CDN / Google Fonts<br/>- Plus Jakarta Sans<br/>- Font Awesome 6 Icons"]
    end

    %% Koneksi Client ke Reverse Proxy
    ClientMobile -->|HTTPS / HTTP-2| ReverseProxy
    ClientTenant -->|HTTPS / Live Polling| ReverseProxy
    ClientAdmin -->|HTTPS / REST API| ReverseProxy

    %% Koneksi Edge ke Aplikasi
    ReverseProxy --> ViteBuild
    ReverseProxy --> RouterMiddleware
    RouterMiddleware --> Controllers
    Controllers --> Services
    Services --> MySQL
    Services --> FileStorage
    Services --> QueueWorker

    %% Integrasi Eksternal
    Services <-->|REST API JSON / HMAC SHA512| Midtrans
    ReverseProxy <--> CDN
```

---

## 2. Arsitektur Berlapis (Layered MVC Architecture)

```mermaid
graph LR
    subgraph Presentation["🎨 Presentation Layer"]
        Blade["Blade Views (*.blade.php)"]
        CSSJS["Modular CSS & JS (Vite)"]
    end

    subgraph Control["⚙️ Controller & Route Layer"]
        WebRoute["Web Routes (routes/web.php)"]
        Controller["Laravel Controllers"]
    end

    subgraph Business["🧠 Domain & Service Layer"]
        CartService["Cart & Pricing Service"]
        PaymentService["Payment & Gateway Service"]
        TenantService["Tenant & Stock Service"]
    end

    subgraph DataAccess["🗄️ Data Access Layer"]
        Eloquent["Eloquent ORM Models"]
        DBMigration["Database Migrations & Seeders"]
    end

    Presentation --> Control
    Control --> Business
    Business --> DataAccess
```
