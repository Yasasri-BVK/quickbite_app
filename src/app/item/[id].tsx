import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "../../context/CartContext";
import { MENU_ITEMS } from "../../data/menu";

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const item = MENU_ITEMS.find((m) => m.id === id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Item not found</Text>
      </View>
    );
  }

  const handleAdd = () => {
    addToCart(item, quantity);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: item.name }} />

      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>Rs. {item.price}</Text>

      <View style={styles.qtyRow}>
        <Pressable
          style={styles.qtyButton}
          onPress={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          <Text style={styles.qtyButtonText}>-</Text>
        </Pressable>
        <Text style={styles.qtyText}>{quantity}</Text>
        <Pressable
          style={styles.qtyButton}
          onPress={() => setQuantity((q) => q + 1)}
        >
          <Text style={styles.qtyButtonText}>+</Text>
        </Pressable>
      </View>

      <Pressable style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>
          Add to Cart - Rs. {item.price * quantity}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 24 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 100, marginTop: 20 },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },
  category: { color: "#888888", marginTop: 4 },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    color: "#444444",
  },
  price: { fontSize: 24, fontWeight: "bold", color: "#FF6B00", marginTop: 16 },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 24 },
  qtyButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF6B00",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: { color: "#FFFFFF", fontSize: 26, fontWeight: "bold" },
  qtyText: { fontSize: 24, fontWeight: "bold", marginHorizontal: 24 },
  addButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 32,
  },
  addButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});
