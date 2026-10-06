<!-- ================= NAVBAR PARTIAL ================= -->
<header class="navbar" id="navbar">
  <div class="navbar-container container">
    <!-- Logo -->
    <a href="{{ url('/') }}" class="brand-logo" id="brand-logo" aria-label="Savoria Bistro Home">
      <span class="logo-icon text-primary"><i class="fa-solid fa-bowl-food"></i></span>
      <div class="logo-text">
        <span class="brand-title">Savoria<span class="accent-dot">.</span></span>
        <span class="brand-subtitle">Bites & Bistro</span>
      </div>
    </a>

    <!-- Search Bar Desktop -->
    <div class="search-wrapper">
      <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
      <input 
        type="text" 
        id="search-input" 
        class="search-input" 
        placeholder="Cari nasi goreng, ayam geprek, matcha, kopi..." 
        autocomplete="off"
      >
      <button id="search-clear-btn" class="search-clear-btn" title="Hapus pencarian" style="display: none;">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <!-- Action Buttons -->
    <div class="nav-actions">
      <!-- Order Type Badge Switcher -->
      <button class="badge-selector" id="order-type-toggle-btn" title="Ubah metode pemesanan">
        <span class="badge-icon" id="order-type-icon"><i class="fa-solid fa-motorcycle"></i></span>
        <span class="badge-label" id="order-type-label">Delivery</span>
      </button>

      <!-- Theme Toggle Button -->
      <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Ganti Tema" title="Mode Gelap / Terang">
        <span class="theme-icon-sun"><i class="fa-solid fa-sun text-amber-400"></i></span>
        <span class="theme-icon-moon"><i class="fa-solid fa-moon text-indigo-300"></i></span>
      </button>

      <!-- Wishlist Button -->
      <button class="nav-icon-btn" id="wishlist-btn" title="Menu Favorit" aria-label="Menu Favorit">
        <span class="icon text-rose-500"><i class="fa-solid fa-heart"></i></span>
        <span class="counter-badge" id="wishlist-badge" style="display: none;">0</span>
      </button>

      <!-- Cart Button -->
      <button class="cart-nav-btn" id="open-cart-btn" aria-label="Buka Keranjang">
        <div class="cart-icon-wrapper">
          <span class="cart-icon"><i class="fa-solid fa-cart-shopping"></i></span>
          <span class="cart-badge" id="cart-badge">0</span>
        </div>
        <div class="cart-nav-total">
          <span class="cart-label">Keranjang</span>
          <span class="cart-amount" id="cart-nav-price">Rp 0</span>
        </div>
      </button>
    </div>
  </div>

  <!-- Mobile Search Bar -->
  <div class="mobile-search-container container">
    <div class="search-wrapper mobile-search">
      <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
      <input 
        type="text" 
        id="mobile-search-input" 
        class="search-input" 
        placeholder="Mau makan apa hari ini?" 
        autocomplete="off"
      >
    </div>
  </div>
</header>
