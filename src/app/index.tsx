import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.replace("/login"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.logo}>🍔</Text>
      <Text style={styles.title}>QuickBite</Text>
      <Text style={styles.subtitle}>Order ahead. Skip the queue.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6B00",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { fontSize: 90 },
  title: { fontSize: 36, fontWeight: "bold", color: "#FFFFFF", marginTop: 10 },
  subtitle: { fontSize: 16, color: "#FFE3CC", marginTop: 6 },
});
