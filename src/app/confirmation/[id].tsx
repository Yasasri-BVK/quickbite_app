import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useOrders } from "../../context/OrderContext";

export default function ConfirmationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getOrder } = useOrders();
  const order = getOrder(id);

  if (!order) {
    return (
      <View style={styles.center}>
        <Text>Order not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "Order Confirmed", headerBackVisible: false }}
      />

      <Text style={styles.check}>✅</Text>
      <Text style={styles.title}>Order Placed!</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Order Number</Text>
        <Text style={styles.orderId}>{order.id}</Text>

        <Text style={styles.label}>Estimated Pickup Time</Text>
        <Text style={styles.value}>{order.pickupTime}</Text>

        <Text style={styles.label}>Total</Text>
        <Text style={styles.value}>Rs. {order.total}</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() =>
          router.replace({
            pathname: "/tracking/[id]",
            params: { id: order.id },
          })
        }
      >
        <Text style={styles.buttonText}>Track Order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 24 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  check: { fontSize: 80, marginTop: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginTop: 8 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    marginTop: 24,
    width: "100%",
    elevation: 3,
  },
  label: { color: "#888888", marginTop: 10 },
  orderId: { fontSize: 32, fontWeight: "bold", color: "#FF6B00" },
  value: { fontSize: 20, fontWeight: "600" },
  button: {
    backgroundColor: "#FF6B00",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});
