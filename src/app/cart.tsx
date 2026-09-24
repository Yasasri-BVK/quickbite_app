import { Stack, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, itemCount, subtotal } =
    useCart();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "My Cart" }} />

      <FlatList
        data={items}
        keyExtractor={(c) => c.item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty</Text>
        }
        renderItem={({ item: c }) => (
          <View style={styles.row}>
            <Text style={styles.emoji}>{c.item.emoji}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{c.item.name}</Text>
              <Text style={styles.price}>Rs. {c.item.price * c.quantity}</Text>
            </View>
            <View style={styles.qtyRow}>
              <Pressable
                style={styles.qtyButton}
                onPress={() => updateQuantity(c.item.id, c.quantity - 1)}
              >
                <Text style={styles.qtyButtonText}>-</Text>
              </Pressable>
              <Text style={styles.qtyText}>{c.quantity}</Text>
              <Pressable
                style={styles.qtyButton}
                onPress={() => updateQuantity(c.item.id, c.quantity + 1)}
              >
                <Text style={styles.qtyButtonText}>+</Text>
              </Pressable>
            </View>
            <Pressable onPress={() => removeFromCart(c.item.id)}>
              <Text style={styles.remove}>✕</Text>
            </Pressable>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.summary}>Items: {itemCount}</Text>
        <Text style={styles.total}>Subtotal: Rs. {subtotal}</Text>
        <Pressable
          style={[styles.checkoutButton, items.length === 0 && styles.disabled]}
          disabled={items.length === 0}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  empty: { textAlign: "center", marginTop: 40, color: "#888888", fontSize: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  emoji: { fontSize: 36, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "600" },
  price: { color: "#FF6B00", fontWeight: "bold", marginTop: 2 },
  qtyRow: { flexDirection: "row", alignItems: "center", marginRight: 10 },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF6B00",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  qtyText: { fontSize: 16, fontWeight: "bold", marginHorizontal: 10 },
  remove: { fontSize: 18, color: "#CC0000", padding: 4 },
  footer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  summary: { fontSize: 16, color: "#444444" },
  total: { fontSize: 22, fontWeight: "bold", marginVertical: 8 },
  checkoutButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  disabled: { backgroundColor: "#CCCCCC" },
  checkoutText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});
