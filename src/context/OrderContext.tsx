import React, { createContext, useContext, useState } from "react";
import { CartItem } from "./CartContext";

export type OrderStatus = "Placed" | "Preparing" | "Ready for pickup";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  name: string;
  phone: string;
  pickupTime: string;
  status: OrderStatus;
};

type OrderContextType = {
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    total: number,
    name: string,
    phone: string,
  ) => Order;
  getOrder: (id: string) => Order | undefined;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const placeOrder = (
    items: CartItem[],
    total: number,
    name: string,
    phone: string,
  ) => {
    const id = "QB" + Math.floor(1000 + Math.random() * 9000);
    const pickupTime = new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    );

    const order: Order = {
      id,
      items,
      total,
      name,
      phone,
      pickupTime,
      status: "Placed",
    };
    setOrders((prev) => [order, ...prev]);

    // Simulated order progress
    setTimeout(() => updateStatus(id, "Preparing"), 8000);
    setTimeout(() => updateStatus(id, "Ready for pickup"), 16000);

    return order;
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used inside OrderProvider");
  return ctx;
}
