import { Stack, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useCart } from "../context/CartContext";
import { CATEGORIES, MENU_ITEMS } from "../data/menu";

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { itemCount } = useCart();
  const numColumns = width >= 600 ? 3 : 2;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "QuickBite",
          headerLeft: () => (
            <Pressable onPress={() => router.push("/profile")}>
              <Text style={styles.headerButton}>👤</Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => router.push("/cart")}>
              <Text style={styles.headerButton}>🛒 {itemCount}</Text>
            </Pressable>
          ),
        }}
      />

      <TextInput
        style={styles.searchBar}
        placeholder="Search food or drinks..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.categoryRow}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            onPress={() => setCategory(c)}
            style={[styles.chip, category === c && styles.chipActive]}
          >
            <Text
              style={[styles.chipText, category === c && styles.chipTextActive]}
            >
              {c}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        key={numColumns}
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No items found</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({ pathname: "/item/[id]", params: { id: item.id } })
            }
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Rs. {item.price}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  headerButton: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5D5C5",
  },
  categoryRow: { flexDirection: "row", flexWrap: "wrap", marginVertical: 12 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FF6B00",
    marginRight: 8,
    marginBottom: 6,
  },
  chipActive: { backgroundColor: "#FF6B00" },
  chipText: { color: "#FF6B00", fontWeight: "600" },
  chipTextActive: { color: "#FFFFFF" },
  list: { paddingBottom: 20 },
  card: {
    flex: 1,
    margin: 6,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    alignItems: "center",
    elevation: 3,
  },
  emoji: { fontSize: 48, marginBottom: 8 },
  name: { fontSize: 15, fontWeight: "600", textAlign: "center" },
  price: { marginTop: 4, color: "#FF6B00", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 40, color: "#888888" },
});
