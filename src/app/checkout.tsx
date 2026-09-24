import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handlePlaceOrder = () => {
    if (name.trim().length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setError("");
    const order = placeOrder(items, subtotal, name.trim(), phone.trim());
    clearCart();
    router.replace({
      pathname: "/confirmation/[id]",
      params: { id: order.id },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: "Checkout" }} />

      <Text style={styles.heading}>Order Summary</Text>
      <View style={styles.card}>
        {items.map((c) => (
          <View key={c.item.id} style={styles.row}>
            <Text style={styles.itemText}>
              {c.quantity} x {c.item.name}
            </Text>
            <Text style={styles.itemText}>Rs. {c.item.price * c.quantity}</Text>
          </View>
        ))}
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>Rs. {subtotal}</Text>
        </View>
      </View>

      <Text style={styles.heading}>Your Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number (10 digits)"
        keyboardType="phone-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
      />

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 18, fontWeight: "bold", marginTop: 8, marginBottom: 8 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  itemText: { fontSize: 15 },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 8,
    marginTop: 4,
  },
  totalText: { fontSize: 17, fontWeight: "bold", color: "#FF6B00" },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5D5C5",
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  error: { color: "#CC0000", marginBottom: 10 },
  button: {
    backgroundColor: "#FF6B00",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});
