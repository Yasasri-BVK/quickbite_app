import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { OrderProvider } from "../context/OrderContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <OrderProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#FF6B00" },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "bold" },
            contentStyle: { backgroundColor: "#FFF8F0" },
          }}
        />
      </OrderProvider>
    </CartProvider>
  );
}
