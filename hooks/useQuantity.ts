import { useEffect } from 'react';
import { useCart } from '@/context/cart-context';

export const useQuantity = (productId: string, initialQuantity: number = 1) => {
  const { updateItemQuantity } = useCart();  // Changed from updateCartItemQuantity to updateItemQuantity

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    let newQuantity = initialQuantity;
    if (action === 'increment') {
      newQuantity = initialQuantity + 1;
    } else if (action === 'decrement' && initialQuantity > 1) {
      newQuantity = initialQuantity - 1;
    }
    updateItemQuantity(productId, newQuantity);  // Changed from updateCartItemQuantity to updateItemQuantity
    return newQuantity;
  };

  return { handleQuantityChange };
};
