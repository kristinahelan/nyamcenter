**Software**  
**Requirement**  
**Specification**  
SISTEM PEMESANAN MAKANAN NYAM CENTER

Oleh:  
1\. Kristina Ina Helan		25091397085  
2\. Anisa Dini Septianda	25091397092  
3\. Riska Nuraini		25091397102

DAFTAR ISI

JUDUL  
DAFTAR ISI  
BAB I PENDAHULUAN  
1.1 Latar Belakang  
1.2 Gambaran Umum Sistem  
1.3 Stakeholder  
1.4 Manajemen dan Pengembangan Tim  
BAB II ANALISIS SISTEM  
	2.1 Analisis Kebutuhan Fungsional  
	2.2 Analisis Kebutuhan Non Fungsional  
	2.3 Analisis Pengguna  
	2.4 Kebutuhan Perangkat  
BAB III PERANCANGAN SISTEM  
	3.1 Pemodelan Terstruktur  
	3.2 Arsitektur Sistem  
	3.3 Pemodelan UML  
BAB IV DESAIN ANTARMUKA (UI/UX)  
	4.1 Wireframe dan Mockup  
	4.2 UX (User Experience)  
	4.3 User Flow  
BAB V RENCANA PENGUJIAN  
	5.1 Requirement  
	5.2 Test Scenario  
	5.3 Test Condition  
KESIMPULAN

**BAB I**  
**PENDAHULUAN**

**1.1 Latar Belakang**  
Sentra Wisata Kuliner (SWK) atau pujasera merupakan area pusat kuliner yang menampung banyak pelaku UMKM (tenant) dalam satu lokasi. Pada jam-jam sibuk, tingginya volume pengunjung sering kali menyebabkan antrean panjang di masing-masing stand. Pengunjung juga kerap kesulitan dalam memanggil pelayan untuk memesan makanan, sementara pencatatan pesanan secara manual di tengah keramaian rentan memicu kesalahan rekap atau pesanan tertukar. Oleh karena itu, dokumen ini menspesifikasikan kebutuhan untuk "Sistem Informasi Pemesanan Makanan Pujasera", sebuah platform berbasis web yang memungkinkan pengunjung memesan makanan dari berbagai stand UMKM secara langsung melalui meja masing-masing. Sistem ini mencakup pemindaian QR Code meja, katalog menu multi-stand, keranjang belanja terpusat, manajemen pesanan oleh masing-masing stand, dan pelaporan transaksi untuk mendigitalisasi operasional pujasera.  

**1.2 Gambaran Umum Sistem**  
Sistem Informasi Pemesanan Makanan Pujasera adalah aplikasi berbasis web *multi-tenant* yang menjembatani transaksi antara pengunjung pujasera dan para pemilik stand UMKM. Alur kerja utama sistem ini dimulai saat pengunjung duduk di meja dan memindai QR Code. Sistem secara otomatis mengenali nomor meja dan menampilkan halaman katalog menu dari seluruh stand yang sedang beroperasi. Pengunjung dapat memasukkan berbagai menu dari stand yang berbeda ke dalam satu keranjang belanja. Setelah pesanan dikonfirmasi, sistem mendistribusikan detail pesanan ke *dashboard* masing-masing stand secara *real-time*. Pemilik stand kemudian memproses pesanan dan memperbarui statusnya. Pengunjung dapat memantau status pesanan tersebut langsung dari layar perangkat mereka tanpa perlu beranjak atau berdiri mengantre di depan stand. 

**1.3 Stakeholder**  
Pemangku kepentingan (*stakeholder*) yang berinteraksi dengan sistem ini adalah:

1. **Pengunjung (Pelanggan):** Pengguna akhir yang melakukan pemindaian QR Code dari meja, memilih menu dari berbagai stand, dan melakukan pemesanan.

2. **Pemilik Stand (Tenant UMKM):** Pelaku usaha yang menggunakan sistem untuk mengelola data menu mereka sendiri, menerima notifikasi pesanan masuk secara instan, dan memperbarui status penyiapan makanan.  
3. **Pengelola Pujasera (Admin):** Pihak manajemen tempat yang bertanggung jawab atas pengelolaan data master, seperti mendaftarkan stand baru, membuat (*generate*) QR Code untuk setiap meja, serta memantau rekapitulasi transaksi seluruh area pujasera.

**1.4 Manajemen dan Pengembangan Tim**  
Pengembangan sistem ini dikelola oleh tim pengembang perangkat lunak yang membagi beban kerja ke dalam beberapa peran teknis spesifik untuk memastikan kualitas sistem dari sisi antarmuka, perancangan data, hingga fungsionalitas program. Tim pengembangan umumnya terdiri dari:

1. **System Analyst & Database Designer:** Bertanggung jawab menganalisis kebutuhan sistem (menyusun SRS) dan merancang model basis data relasional (termasuk penyusunan CDM, PDM, hingga memastikan tabel-tabel seperti Data Meja, Stand, dan Detail Transaksi memenuhi kaidah normalisasi).  
2. **UI/UX Designer:** Bertugas merancang *wireframe* dan *prototype* antarmuka (misalnya merancang alur *mobile-first* di Figma) agar tata letak web mudah dan nyaman digunakan oleh pelanggan saat memindai menu.  
3. **Programmer / Web Developer:** Bertugas menulis logika kode dan menghubungkan antarmuka ke basis data agar seluruh fitur utama (seperti *cart* multi-stand dan pembaruan status *real-time*) dapat berjalan.

**BAB II**  
**ANALISIS SISTEM**

**2.1 Analisis Kebutuhan Fungsional**  
Kebutuhan fungsional menjabarkan proses apa saja yang harus dapat dilakukan oleh sistem berdasarkan peran (*role*) masing-masing pengguna:

* **Fungsi Pengunjung (Pelanggan):**  
  1. Sistem memungkinkan pengunjung memindai QR Code di meja untuk masuk ke halaman pemesanan secara otomatis tanpa perlu registrasi akun (*guest checkout*).  
  2. Sistem menampilkan daftar menu yang dikelompokkan berdasarkan stand UMKM yang sedang beroperasi.  
  3. Sistem menyediakan fitur keranjang (*cart*) terpusat yang dapat menampung gabungan pesanan dari beberapa stand berbeda dalam satu kali transaksi.  
  4. Sistem menampilkan struk digital dan melacak status pesanan secara *real-time* (misalnya: "Pesanan Masuk", "Sedang Disiapkan", "Siap Diambil/Diantar").  
* **Fungsi Pemilik Stand (Tenant):**  
  1. Sistem menyediakan fitur otentikasi (Login/Logout) untuk keamanan akses *dashboard* stand.  
  2. Sistem memungkinkan pemilik stand melakukan operasi CRUD (Tambah, Baca, Ubah, Hapus) pada data menu mereka sendiri, serta mengatur status ketersediaan (*Sold Out* / Tersedia).  
  3. Sistem menampilkan daftar pesanan masuk yang spesifik hanya untuk menu dari stand tersebut.  
  4. Sistem memungkinkan pemilik stand memperbarui status progres pesanan yang akan langsung tercermin di layar pengunjung.  
* **Fungsi Admin (Pengelola Pujasera):**  
  1. Sistem menyediakan fitur manajemen data meja, termasuk pembuatan (*generate*) QR Code unik untuk setiap meja.  
  2. Sistem memungkinkan admin mengelola data (mendaftarkan, menonaktifkan) akun pemilik stand.  
  3. Sistem menampilkan laporan dan rekapitulasi data transaksi harian atau bulanan dari seluruh aktivitas di pujasera.

**2.2 Analisis Kebutuhan Non Fungsional**  
Kebutuhan non-fungsional menitikberatkan pada kualitas, performa, dan batasan sistem saat beroperasi:

* **Usability (Kebergunaan):** Antarmuka pengunjung wajib menggunakan pendekatan *mobile-first design*, sehingga elemen tombol dan teks tetap nyaman dinavigasi melalui layar sentuh tanpa perlu memperbesar (*zoom*) halaman.  
* **Performance (Kinerja):** Sistem harus mampu memuat pembaruan status pesanan dari *dashboard* stand ke layar ponsel pengunjung dengan jeda waktu seminimal mungkin, tanpa mengharuskan pengunjung memuat ulang (*refresh*) browser terus-menerus.  
* **Security (Keamanan):** Sistem harus mengimplementasikan batas waktu sesi (*session timeout*) pada ID meja. Jika pengunjung telah selesai dan meninggalkan meja, sesi akan direset agar pengunjung berikutnya tidak bisa melihat riwayat pesanan sebelumnya.  
* **Availability (Ketersediaan):** Sistem dirancang untuk memiliki *uptime* yang stabil selama jam operasional pujasera (terutama pada jam sibuk makan siang dan malam).

**2.3 Analisis Pengguna**  
Analisis ini mendeskripsikan karakteristik aktor yang akan berinteraksi dengan sistem untuk menentukan pendekatan desain yang tepat:

* **Pengunjung:** Merupakan masyarakat umum dengan berbagai tingkat literasi digital. Membutuhkan alur pemesanan yang instan dan praktis. Oleh karena itu, sistem tidak mewajibkan pendaftaran akun untuk mempercepat proses transaksi di tengah kondisi pujasera yang ramai.

* **Pemilik Stand:** Pelaku UMKM yang sering kali harus membagi fokus antara memasak dan memantau layar pesanan. Membutuhkan antarmuka *dashboard* yang sangat sederhana, memiliki kontras warna yang jelas untuk membedakan pesanan baru dan lama, serta tombol interaksi yang cukup besar.  
* **Admin Pujasera:** Pengelola manajerial yang bertugas mengawasi operasional dan pelaporan keuangan. Membutuhkan visualisasi data yang terstruktur seperti tabel rekapitulasi atau grafik penjualan.


**2.4 Kebutuhan Perangkat**  
Kebutuhan perangkat dibagi menjadi dua tahap, yaitu spesifikasi untuk lingkungan pengembangan (*development*) dan spesifikasi operasional (*production*).  
**A. Kebutuhan Perangkat Keras (Hardware)**  
**Sisi Pengembang:** Laptop atau komputer dengan spesifikasi prosesor setara AMD Ryzen 3 dan kapasitas RAM yang memadai (minimal 4GB \- 8GB) seperti pada perangkat Lenovo IdeaPad Slim 3 untuk menjalankan *local server* dan *code editor* dengan lancar.

**Sisi Pengunjung:** *Smartphone* dengan modul kamera yang berfungsi optimal (misalnya perangkat sekelas iPhone XR atau Android ekuivalen) untuk memindai QR Code.

**Sisi Stand & Admin:** Komputer, laptop, atau tablet dengan koneksi internet yang ditempatkan di area pujasera untuk membiarkan *dashboard* pesanan menyala secara terus-menerus (*always-on display*).

**B. Kebutuhan Perangkat Lunak (Software)**

* **Lingkungan Pengembangan (Sisi Pengembang):**

**Teks Editor:** Visual Studio Code untuk penulisan kode sumber.

**Desain Antarmuka:** Figma untuk pembuatan *wireframe* dan *prototype* UI/UX sistem.

**Perancangan Sistem:** Draw.io untuk perancangan alur diagram, *Entity Relationship Diagram* (ERD), dan *Conceptual Data Model* (CDM).

**Basis Data:** MySQL sebagai sistem manajemen basis data relasional (RDBMS) yang dikelola melalui web server lokal (seperti XAMPP).

* **Lingkungan Operasional (Sisi Pengguna):** Peramban web (*Web Browser*) bawaan ponsel seperti Google Chrome, Safari, atau peramban standar lainnya tanpa perlu instalasi aplikasi tambahan.

**BAB III**  
**PERANCANGAN SISTEM**

3.1 Pemodelan Terstruktur

3.2 Arsitektur Sistem  
3.3 Pemodelan UML

**BAB IV**  
**DESAIN ANTARMUKA (UI/UX)**

4.1 Wireframe dan Mockup  
4.2 UX (User Experience)  
4.3 User Flow

BAB V  
RENCANA PENGUJIAN

5.1 Requirement  
5.2 Test Scenario  
5.3 Test Condition

KESIMPULAN

s