"use client";
import { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  customization?: {
    coverDesign: string;
    pageLayout: string;
    paperType: string;
    bindingType: string;
  };
}

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addToCart: (item: CartItem) => void;
  recentlyAddedItem: CartItem | null;
  resetRecentlyAddedItem: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentlyAddedItem, setRecentlyAddedItem] = useState<CartItem | null>(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Automatically dismiss recently added item notification after 3 seconds
  useEffect(() => {
    if (recentlyAddedItem) {
      const timer = setTimeout(() => {
        setRecentlyAddedItem(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [recentlyAddedItem]);

  // Add storage synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        try {
          const newCart = e.newValue ? JSON.parse(e.newValue) : [];
          setCart(newCart);
        } catch (error) {
          console.error("Error parsing cart from storage:", error);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => 
        i.id === item.id && 
        JSON.stringify(i.customization) === JSON.stringify(item.customization)
      );

      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id && 
          JSON.stringify(i.customization) === JSON.stringify(item.customization)
            ? { ...i, quantity: item.quantity }
            : i
        );
      }

      return [...prevCart, item];
    });
    setRecentlyAddedItem(item);
  };

  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const addToCart = (item: CartItem) => {
    addItem(item);
  };

  const resetRecentlyAddedItem = () => {
    setRecentlyAddedItem(null);
  };

  return (
    <CartContext.Provider
      value={{
        items: cart, // updated field name for consistency
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        addToCart,
        recentlyAddedItem,
        resetRecentlyAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
