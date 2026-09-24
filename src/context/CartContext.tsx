import React, { createContext, useContext, useMemo, useState } from "react";
import { MenuItem } from "../data/menu";

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: MenuItem, quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + quantity } : c,
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((c) => c.item.id !== id)
        : prev.map((c) => (c.item.id === id ? { ...c, quantity } : c)),
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((c) => c.item.id !== id));
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(
    () => items.reduce((sum, c) => sum + c.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, c) => sum + c.item.price * c.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
