/**
 * Data Katalog Menu Makanan, Minuman, Kategori, dan Voucher Promo Savoria Bites
 */

export const RESTAURANT_INFO = {
  name: 'Savoria Bites & Bistro',
  tagline: 'Cita Rasa Nusantara & Modern Fusion Lezat Terpercaya',
  rating: 4.9,
  address: 'Jl. Boulevard Kuliner No. 88, Surabaya',
  openStatus: 'Buka Sekarang • 09.00 - 22.00 WIB',
  deliveryFee: 12000,
  freeDeliveryThreshold: 75000,
  taxRate: 0.10 // 10% PB1 Resto
};

export const MENU_CATEGORIES = [
  { id: 'all', name: 'Semua Menu', icon: '<i class="fa-solid fa-utensils"></i>' },
  { id: 'makanan-utama', name: 'Makanan Utama', icon: '<i class="fa-solid fa-bowl-rice"></i>' },
  { id: 'snack', name: 'Snack & Dimsum', icon: '<i class="fa-solid fa-cookie-bite"></i>' },
  { id: 'minuman', name: 'Minuman & Kopi', icon: '<i class="fa-solid fa-mug-saucer"></i>' },
  { id: 'paket-hemat', name: 'Paket Hemat', icon: '<i class="fa-solid fa-box-open"></i>' },
  { id: 'healthy', name: 'Sehat & Salad', icon: '<i class="fa-solid fa-carrot"></i>' }
];

export const MENU_ITEMS = [
  {
    id: 'menu-1',
    name: 'Ayam Geprek Sambal Matah',
    category: 'makanan-utama',
    price: 32000,
    originalPrice: 38000,
    rating: 4.9,
    reviewsCount: 342,
    prepTime: '15-20 min',
    isBestSeller: true,
    isPromo: true,
    spicyLevel: 3,
    description: 'Ayam krispi renyah di luar juicy di dalam, digeprek dengan sambal matah khas Bali segar dengan aroma serai dan daun jeruk pilihan.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Reguler (Nasi + 1 Ayam)', extra: 0 },
        { name: 'Jumbo (Nasi Dobel + 2 Ayam)', extra: 15000 }
      ],
      spicyLevels: ['Level 0 (Tanpa Cabai)', 'Level 1 (Sedang)', 'Level 3 (Pedas Mantap)', 'Level 5 (Super Pedas Gurih)'],
      toppings: [
        { id: 'top-telur', name: 'Telur Mata Sapi Setengah Matang', price: 4000 },
        { id: 'top-keju', name: 'Keju Mozzarella Melt', price: 7000 },
        { id: 'top-sambal', name: 'Ekstra Sambal Matah 1 Cup', price: 3500 },
        { id: 'top-kerupuk', name: 'Kerupuk Kulit Gurih', price: 3000 }
      ]
    }
  },
  {
    id: 'menu-2',
    name: 'Nasi Goreng Wagyu Royal',
    category: 'makanan-utama',
    price: 48000,
    originalPrice: 55000,
    rating: 4.95,
    reviewsCount: 420,
    prepTime: '15-20 min',
    isBestSeller: true,
    isPromo: false,
    spicyLevel: 2,
    description: 'Nasi goreng bumbu rempah harum khas Nusantara berpadu dengan potongan daging sapi Wagyu empuk, disajikan bersama telur ceplok dan acar segar.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Porsi Reguler', extra: 0 },
        { name: 'Porsi Jumbo Special', extra: 14000 }
      ],
      spicyLevels: ['Pedas Manis (Level 1)', 'Pedas Gurih (Level 2)', 'Pedas Rawit (Level 4)'],
      toppings: [
        { id: 'top-telur', name: 'Telur Dadar Krispi', price: 4000 },
        { id: 'top-sosis', name: 'Sosis Sapi Bratwurst', price: 6000 },
        { id: 'top-ati', name: 'Ati Ampela Bumbu Kecap', price: 5000 },
        { id: 'top-emping', name: 'Emping Renyah Gurih', price: 4000 }
      ]
    }
  },
  {
    id: 'menu-3',
    name: 'Rendang Daging Sapi Minang',
    category: 'makanan-utama',
    price: 42000,
    originalPrice: 0,
    rating: 4.9,
    reviewsCount: 280,
    prepTime: '10-15 min',
    isBestSeller: true,
    isPromo: false,
    spicyLevel: 2,
    description: 'Daging sapi pilihan dimasak perlahan dengan santan kental dan 16 rempah tradisional Minang hingga bumbu meresap sempurna dan empuk.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Paket Nasi Rendang Lengkap', extra: 0 },
        { name: 'Double Daging Rendang + Sayur Daun Singkong', extra: 22000 }
      ],
      spicyLevels: ['Rasa Asli Autentik Minang'],
      toppings: [
        { id: 'top-nasi', name: 'Tambah Nasi Putih Pulen', price: 5000 },
        { id: 'top-perkedel', name: 'Perkedel Kentang Padang', price: 4000 },
        { id: 'top-sambal-ijo', name: 'Ekstra Sambal Ijo Khas', price: 3000 }
      ]
    }
  },
  {
    id: 'menu-4',
    name: 'Bakmi Ayam Jamur Pangsit Crispy',
    category: 'makanan-utama',
    price: 29000,
    originalPrice: 34000,
    rating: 4.8,
    reviewsCount: 195,
    prepTime: '12-15 min',
    isBestSeller: false,
    isPromo: true,
    spicyLevel: 1,
    description: 'Mie kenyal gurih dengan topping ayam cincang manis gurih, jamur kancing lembut, caisim segar, kuah kaldu hangat, dan 2 pcs pangsit goreng mekar.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Mie Keriting Reguler', extra: 0 },
        { name: 'Mie Karet Reguler', extra: 2000 },
        { name: 'Porsi Jumbo Special', extra: 10000 }
      ],
      spicyLevels: ['Original Gurih (Pisah Sambal)', 'Pedas Sedang', 'Pedas Mampus'],
      toppings: [
        { id: 'top-pangsit-rebus', name: 'Pangsit Rebus (2 pcs)', price: 5000 },
        { id: 'top-bakso', name: 'Bakso Sapi Urat (2 butir)', price: 6000 },
        { id: 'top-pangsit-goreng', name: 'Ekstra Pangsit Goreng (2 pcs)', price: 5000 }
      ]
    }
  },
  {
    id: 'menu-5',
    name: 'Dimsum Ayam Udang Melt (4 pcs)',
    category: 'snack',
    price: 24000,
    originalPrice: 28000,
    rating: 4.85,
    reviewsCount: 512,
    prepTime: '10-15 min',
    isBestSeller: true,
    isPromo: true,
    spicyLevel: 0,
    description: 'Siomay dimsum kukus dengan isian daging ayam cincang dan udang segar juicy, dibalut kulit tipis lembut serta cocolan saus mentai / chili oil istimewa.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Porsi 4 pcs', extra: 0 },
        { name: 'Porsi 8 pcs (Lebih Hemat)', extra: 20000 }
      ],
      spicyLevels: ['Chili Oil Signature', 'Saus Asam Manis Pedas', 'Mayo Mentai Bakar'],
      toppings: [
        { id: 'top-mentai', name: 'Topping Saus Mentai Torched', price: 5000 },
        { id: 'top-chilioil', name: 'Ekstra Chili Oil Wangi', price: 3000 },
        { id: 'top-mozza', name: 'Keju Mozzarella Leleh', price: 6000 }
      ]
    }
  },
  {
    id: 'menu-6',
    name: 'Truffle French Fries & Garlic Mayo',
    category: 'snack',
    price: 26000,
    originalPrice: 0,
    rating: 4.75,
    reviewsCount: 160,
    prepTime: '10-12 min',
    isBestSeller: false,
    isPromo: false,
    spicyLevel: 0,
    description: 'Kentang goreng impor potongan renyah dibumbui dengan minyak truffle wangi, taburan keju parmesan parut, dan cocolan garlic mayo gurih creamy.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Ukuran Medium', extra: 0 },
        { name: 'Ukuran Large', extra: 8000 }
      ],
      spicyLevels: ['Non-Pedas (Original Truffle)'],
      toppings: [
        { id: 'top-parmesan', name: 'Ekstra Keju Parmesan', price: 4000 },
        { id: 'top-sauce', name: 'Ekstra Saus Garlic Mayo', price: 3000 }
      ]
    }
  },
  {
    id: 'menu-7',
    name: 'Pisang Bakar Coklat Keju Karamel',
    category: 'snack',
    price: 22000,
    originalPrice: 25000,
    rating: 4.8,
    reviewsCount: 210,
    prepTime: '10-15 min',
    isBestSeller: false,
    isPromo: true,
    spicyLevel: 0,
    description: 'Pisang raja bakar harum legit dengan taburan keju cheddar parut melimpah, coklat meisjes Belanda, dan lelehan saus karamel mentega susu.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Porsi Reguler', extra: 0 },
        { name: 'Porsi Jumbo Special', extra: 8000 }
      ],
      spicyLevels: ['Manis Legit Gurih'],
      toppings: [
        { id: 'top-ice-cream', name: 'Scoop Vanilla Ice Cream', price: 6000 },
        { id: 'top-almond', name: 'Roasted Almond Flakes', price: 4000 }
      ]
    }
  },
  {
    id: 'menu-8',
    name: 'Es Kopi Susu Aren Savoria',
    category: 'minuman',
    price: 19000,
    originalPrice: 24000,
    rating: 4.95,
    reviewsCount: 890,
    prepTime: '5-8 min',
    isBestSeller: true,
    isPromo: true,
    spicyLevel: 0,
    description: 'Kopi espresso blend Arabica-Robusta wangi dipadukan dengan fresh milk lembut dan gula aren murni Sukabumi yang legit berkaramel.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Gelas Regular 16oz', extra: 0 },
        { name: 'Gelas Jumbo 22oz', extra: 6000 },
        { name: 'Botol Literan 1 Liter', extra: 45000 }
      ],
      spicyLevels: ['Less Sweet (50%)', 'Normal Sweet (100%)', 'Extra Shot Mantap'],
      toppings: [
        { id: 'top-boba', name: 'Brown Sugar Pearl Boba', price: 4000 },
        { id: 'top-jelly', name: 'Grass Jelly Cincau Hitam', price: 3000 },
        { id: 'top-foam', name: 'Creamy Macchiato Foam', price: 5000 }
      ]
    }
  },
  {
    id: 'menu-9',
    name: 'Uji Matcha Latte Creamy Cheese',
    category: 'minuman',
    price: 25000,
    originalPrice: 30000,
    rating: 4.9,
    reviewsCount: 310,
    prepTime: '5-8 min',
    isBestSeller: true,
    isPromo: false,
    spicyLevel: 0,
    description: 'Bubuk green tea Matcha asli Kyoto Jepang dengan susu segar dingin dan lapisan keju gurih creamy (*cream cheese foam*) tebal di atasnya.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Gelas Reguler Dingin', extra: 0 },
        { name: 'Gelas Dingin Large', extra: 5000 },
        { name: 'Penyajian Hangat (Hot Matcha)', extra: 0 }
      ],
      spicyLevels: ['Less Sweet (50%)', 'Normal Sweet (100%)'],
      toppings: [
        { id: 'top-foam', name: 'Ekstra Cheese Cloud Foam', price: 5000 },
        { id: 'top-boba', name: 'Boba Kenyal', price: 4000 }
      ]
    }
  },
  {
    id: 'menu-10',
    name: 'Strawberry Mint Sparkler Cooler',
    category: 'minuman',
    price: 21000,
    originalPrice: 0,
    rating: 4.8,
    reviewsCount: 140,
    prepTime: '5 min',
    isBestSeller: false,
    isPromo: false,
    spicyLevel: 0,
    description: 'Mocktail dingin menyegarkan dari sari buah stroberi asli, soda dingin berdesis, perasan jeruk nipis, dan remasan daun mint segar.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Gelas 16oz', extra: 0 },
        { name: 'Gelas 22oz', extra: 4000 }
      ],
      spicyLevels: ['Normal Ice', 'Less Ice'],
      toppings: [
        { id: 'top-chia', name: 'Chia Seeds & Nata De Coco', price: 3000 },
        { id: 'top-popping', name: 'Popping Boba Lychee', price: 4000 }
      ]
    }
  },
  {
    id: 'menu-11',
    name: 'Paket Puas Geprek + Es Kopi Aren',
    category: 'paket-hemat',
    price: 45000,
    originalPrice: 56000,
    rating: 4.95,
    reviewsCount: 630,
    prepTime: '15 min',
    isBestSeller: true,
    isPromo: true,
    spicyLevel: 3,
    description: 'Kombo terlaris! 1 Porsi Nasi Ayam Geprek Sambal Matah gurih + 1 Gelas Es Kopi Susu Aren dingin segar + Kerupuk Udang renyah.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Paket Standard Lengkap', extra: 0 },
        { name: 'Paket Upgrade Jumbo (Ayam Dobel + Kopi Besar)', extra: 16000 }
      ],
      spicyLevels: ['Geprek Level 1 (Sedang)', 'Geprek Level 3 (Pedas Mantap)', 'Geprek Level 5 (Pedas Ekstrem)'],
      toppings: [
        { id: 'top-telur', name: 'Telur Mata Sapi', price: 4000 },
        { id: 'top-keju', name: 'Keju Mozzarella Melt', price: 7000 }
      ]
    }
  },
  {
    id: 'menu-12',
    name: 'Paket Duo Dimsum + Thai Tea',
    category: 'paket-hemat',
    price: 36000,
    originalPrice: 46000,
    rating: 4.88,
    reviewsCount: 290,
    prepTime: '10-15 min',
    isBestSeller: false,
    isPromo: true,
    spicyLevel: 1,
    description: 'Paket ngemil sore asyik! 4 pcs Dimsum Ayam Udang Mentai + 1 Gelas Authentic Thai Tea Boba dingin menyegarkan.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Paket Standar', extra: 0 },
        { name: 'Paket Dimsum Dobel (8 pcs)', extra: 18000 }
      ],
      spicyLevels: ['Chili Oil Gurih', 'Saus Mentai Bakar'],
      toppings: [
        { id: 'top-boba', name: 'Ekstra Boba Brown Sugar', price: 4000 }
      ]
    }
  },
  {
    id: 'menu-13',
    name: 'Salmon Teriyaki Poké Bowl',
    category: 'healthy',
    price: 52000,
    originalPrice: 59000,
    rating: 4.92,
    reviewsCount: 175,
    prepTime: '12-15 min',
    isBestSeller: true,
    isPromo: false,
    spicyLevel: 0,
    description: 'Potongan salmon segar glasir teriyaki, disajikan dengan nasi jepang pulen/quinoa, edamame jepang, alpukat mentega, jagung manis, dan taburan nori serta wijen panggang.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Base Nasi Jepang Furikake', extra: 0 },
        { name: 'Base Quinoa Organik & Selada', extra: 6000 }
      ],
      spicyLevels: ['Saus Teriyaki Manis Gurih', 'Spicy Mayo Mentai Dressing', 'Sesame Roasted Dressing'],
      toppings: [
        { id: 'top-alpukat', name: 'Ekstra Alpukat Mentega', price: 6000 },
        { id: 'top-tobiko', name: 'Telur Ikan Tobiko Oranye', price: 7000 },
        { id: 'top-edamame', name: 'Ekstra Edamame Kupas', price: 4000 }
      ]
    }
  },
  {
    id: 'menu-14',
    name: 'Grilled Chicken Caesar Salad Bowl',
    category: 'healthy',
    price: 38000,
    originalPrice: 0,
    rating: 4.82,
    reviewsCount: 120,
    prepTime: '10 min',
    isBestSeller: false,
    isPromo: false,
    spicyLevel: 0,
    description: 'Dada ayam panggang bumbu herbs lembut, selada romaine krispi, tomat ceri segar, crouton roti panggang renyah, serutan parmesan, dan dressing caesar autentik.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    options: {
      portions: [
        { name: 'Porsi Standar Salad Bowl', extra: 0 },
        { name: 'Porsi Jumbo Extra Chicken Breast', extra: 12000 }
      ],
      spicyLevels: ['Caesar Dressing Classic', 'Honey Mustard Dressing', 'Olive Oil & Lemon'],
      toppings: [
        { id: 'top-telur-rebus', name: 'Telur Rebus Omega (1 butir)', price: 4000 },
        { id: 'top-crouton', name: 'Ekstra Croutons Renyah', price: 3000 }
      ]
    }
  }
];

export const PROMO_VOUCHERS = [
  {
    code: 'SAVORHEMAT',
    title: 'Diskon Rp 20.000',
    description: 'Potongan Rp 20.000 untuk minimal belanja Rp 50.000',
    type: 'fixed',
    discount: 20000,
    minSpend: 50000
  },
  {
    code: 'GRATISONGKIR',
    title: 'Gratis Ongkir Rp 10.000',
    description: 'Potongan ongkir s.d Rp 10.000 untuk minimal belanja Rp 35.000',
    type: 'delivery',
    discount: 10000,
    minSpend: 35000
  },
  {
    code: 'DISKON30',
    title: 'Diskon 30%',
    description: 'Potongan 30% hingga maksimal Rp 30.000 (Min. belanja Rp 60.000)',
    type: 'percent',
    percent: 30,
    maxDiscount: 30000,
    minSpend: 60000
  },
  {
    code: 'MAKANENAK',
    title: 'Diskon Rp 10.000',
    description: 'Potongan Rp 10.000 tanpa batas minimum belanja',
    type: 'fixed',
    discount: 10000,
    minSpend: 0
  }
];
