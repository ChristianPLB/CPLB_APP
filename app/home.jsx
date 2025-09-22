// app/home.jsx
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>🎵 LyriX Home</Text>
        <Text style={styles.subtitle}>Welcome! Choose where you want to go.</Text>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <View style={styles.navButton}>
          <Button title="Search" onPress={() => router.push("/search")} />
        </View>

        <View style={styles.navButton}>
          <Button title="Favorites" onPress={() => router.push("/favorites")} />
        </View>

        <View style={styles.navButton}>
          <Button title="Artists" onPress={() => router.push("/artist")} />
        </View>

        <View style={styles.navButton}>
          <Button title="Albums" onPress={() => router.push("/album")} />
        </View>

        <View style={styles.navButton}>
          <Button title="Profile" onPress={() => router.push("/profile")} />
        </View>

        <View style={styles.navButton}>
          <Button title="Logout" color="red" onPress={() => router.push("/logout")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center" },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  navButton: { flex: 1, marginHorizontal: 2, alignItems: "center" },
});
