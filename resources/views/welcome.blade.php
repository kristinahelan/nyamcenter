@extends('layouts.app')

@section('title', 'Savoria Bites & Bistro - Pemesanan Makanan Online Modern')
@section('meta_description', 'Pesan makanan dan minuman lezat khas Nusantara & Modern Fusion dengan mudah, cepat, promo voucher menarik, dan pelacakan pesanan real-time.')

@section('content')
  <!-- Hero Section & Promo Banner -->
  @include('partials.hero')

  <!-- Voucher Quick Bar -->
  @include('partials.voucher-bar')

  <!-- Menu Catalog & Filter Section -->
  @include('partials.menu-catalog')
@endsection
