// app/home.jsx
import { useRouter } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 👈 Import icons

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>🎵 LyriX Home</Text>
        <Text style={styles.subtitle}>Welcome! Choose where you want to go.</Text>
      </View>

      {/* Floating + Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/goals/create")} // ✅ Fixed path
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        {/* Search Page */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/search")}
        >
          <Ionicons name="search" size={28} color="#333" />
        </TouchableOpacity>

        {/* Artist Page */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/artist")} // ✅ Should go to Artist List
        >
          <Ionicons name="person" size={28} color="#333" />
        </TouchableOpacity>

        {/* Album Page */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/album")} // ✅ Should go to Album List
        >
          <Ionicons name="musical-notes" size={28} color="#333" />
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="settings" size={28} color="#333" />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/logout")}
        >
          <Ionicons name="log-out" size={28} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center" },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
    paddingBottom: 40,
  },
  navButton: { flex: 1, alignItems: "center" },

  // Floating Action Button (FAB)
  fab: {
    position: "absolute",
    bottom: 120, // above navbar
    right: 20,
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
