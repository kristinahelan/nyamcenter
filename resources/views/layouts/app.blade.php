<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'Savoria Bites & Bistro - Pemesanan Makanan Online Modern')</title>
  <meta name="description" content="@yield('meta_description', 'Pesan makanan dan minuman lezat khas Nusantara & Modern Fusion dengan mudah, cepat, promo voucher menarik, dan pelacakan pesanan real-time.')">
  
  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Icon Library: Font Awesome 6 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%200%2032%2032%22><text y=%2226%22 font-size=%2226%22>🍲</text></svg>">

  <!-- Modular Bundled CSS & JS with Vite -->
  @vite(['resources/css/app.css', 'resources/js/app.js'])

  @yield('styles')
</head>
<body>

  <!-- ================= NAVBAR ================= -->
  @include('partials.navbar')

  <!-- ================= MAIN CONTENT ================= -->
  <main>
    @yield('content')
  </main>

  <!-- ================= FOOTER ================= -->
  @include('partials.footer')

  <!-- ================= MODALS & DRAWERS ================= -->
  @include('partials.modals.custom-menu')
  @include('partials.modals.cart-drawer')
  @include('partials.modals.checkout')
  @include('partials.modals.qris')
  @include('partials.modals.tracker')
  @include('partials.floating-cart')
  @include('partials.toast')

  @yield('scripts')
</body>
</html>
