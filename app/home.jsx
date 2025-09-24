// app/home.jsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const { firstname } = JSON.parse(storedUser);
        setFirstname(firstname || "");
      }
    };
    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top-right Welcome */}
      <View style={styles.topLeft}>
        <Text style={styles.welcomeText}> Welcome, {firstname}</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>🎵 LyriX Home</Text>
        <Text style={styles.subtitle}>Welcome! Choose where you want to go.</Text>
      </View>

      {/* Floating + Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/goals/create")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/search")}
        >
          <Ionicons name="search" size={28} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/artist")}
        >
          <Ionicons name="person" size={28} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/album")}
        >
          <Ionicons name="musical-notes" size={28} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="settings" size={28} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topRight: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "600",
    color: "#333",
  },
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
  fab: {
    position: "absolute",
    bottom: 120,
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
