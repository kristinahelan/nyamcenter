/**
 * Application State and LocalStorage Persistence
 */

export const AppState = {
  cart: [],
  favorites: [],
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'popular',
  filterPromo: false,
  filterBestSeller: false,
  appliedVoucher: null,
  orderType: 'delivery', // 'delivery' | 'dinein' | 'takeaway'
  currentActiveItem: null, // item being customized in modal
  modalSelection: {
    portion: null,
    spicyLevel: null,
    toppings: [],
    notes: '',
    quantity: 1
  },
  activeOrder: null,
  trackerStep: 1,
  trackerInterval: null,
  qrisCountdownInterval: null
};

export function loadStoredData() {
  try {
    const savedCart = localStorage.getItem('savoria_cart');
    if (savedCart) AppState.cart = JSON.parse(savedCart);

    const savedFavs = localStorage.getItem('savoria_favs');
    if (savedFavs) AppState.favorites = JSON.parse(savedFavs);

    const savedOrderType = localStorage.getItem('savoria_ordertype');
    if (savedOrderType) AppState.orderType = savedOrderType;
  } catch (err) {
    console.error('Error loading localStorage:', err);
  }
}

export function saveCartToStorage() {
  try {
    localStorage.setItem('savoria_cart', JSON.stringify(AppState.cart));
  } catch (err) {
    console.error('Error saving cart:', err);
  }
}

export function saveFavoritesToStorage() {
  try {
    localStorage.setItem('savoria_favs', JSON.stringify(AppState.favorites));
  } catch (err) {
    console.error('Error saving favorites:', err);
  }
}
