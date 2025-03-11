export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  customization?: {
    coverDesign?: string;
    pageLayout?: string;
    paperType?: string;
    bindingType?: string;
  };
}

export const formatPrice = (price: number): string => {
  return `₹${price.toFixed(2)}`;
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};
