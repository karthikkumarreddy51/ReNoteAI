import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item) => {
    setCartItems([...cartItems, item]);
  };

  const incrementItem = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrementItem = (id) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity - 1;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(item => item !== null));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const refreshCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, incrementItem, decrementItem, removeItem, updateQuantity, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};
