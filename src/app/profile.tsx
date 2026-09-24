import { Stack, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useOrders } from "../context/OrderContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { orders } = useOrders();
  const userName = orders.length > 0 ? orders[0].name : "Guest";

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "My Profile" }} />

      <View style={styles.header}>
        <Text style={styles.avatar}>👤</Text>
        <Text style={styles.name}>{userName}</Text>
      </View>

      <Text style={styles.heading}>Order History</Text>

      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        ListEmptyComponent={<Text style={styles.empty}>No orders yet</Text>}
        renderItem={({ item: o }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({ pathname: "/tracking/[id]", params: { id: o.id } })
            }
          >
            <View>
              <Text style={styles.orderId}>{o.id}</Text>
              <Text style={styles.status}>{o.status}</Text>
            </View>
            <Text style={styles.total}>Rs. {o.total}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { alignItems: "center", marginVertical: 16 },
  avatar: { fontSize: 64 },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 6 },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  empty: { textAlign: "center", marginTop: 30, color: "#888888" },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },
  orderId: { fontSize: 18, fontWeight: "bold", color: "#FF6B00" },
  status: { color: "#666666", marginTop: 2 },
  total: { fontSize: 16, fontWeight: "bold" },
});
