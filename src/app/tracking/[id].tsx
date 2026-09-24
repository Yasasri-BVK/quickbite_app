import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { OrderStatus, useOrders } from "../../context/OrderContext";

const STEPS: OrderStatus[] = ["Placed", "Preparing", "Ready for pickup"];

export default function TrackingScreen() {
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

  const currentIndex = STEPS.indexOf(order.status);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "Track Order", headerBackVisible: false }}
      />

      <Text style={styles.orderId}>Order {order.id}</Text>
      <Text style={styles.pickup}>Pickup around {order.pickupTime}</Text>

      <View style={styles.steps}>
        {STEPS.map((step, index) => {
          const done = index <= currentIndex;
          return (
            <View key={step} style={styles.stepRow}>
              <View style={[styles.dot, done && styles.dotDone]}>
                <Text style={styles.dotText}>{done ? "✓" : ""}</Text>
              </View>
              <Text style={[styles.stepText, done && styles.stepTextDone]}>
                {step}
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.current}>Status: {order.status}</Text>

      <Pressable style={styles.button} onPress={() => router.replace("/home")}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 24 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  orderId: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6B00",
    marginTop: 10,
  },
  pickup: { fontSize: 16, color: "#666666", marginTop: 4 },
  steps: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    marginTop: 30,
    width: "100%",
    elevation: 3,
  },
  stepRow: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  dotDone: { backgroundColor: "#FF6B00" },
  dotText: { color: "#FFFFFF", fontWeight: "bold" },
  stepText: { fontSize: 18, color: "#999999" },
  stepTextDone: { color: "#000000", fontWeight: "600" },
  current: { fontSize: 18, fontWeight: "600", marginTop: 24 },
  button: {
    backgroundColor: "#FF6B00",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});
