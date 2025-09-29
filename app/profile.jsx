import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config/FirebaseConfig";

export default function ProfilePage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const { username, email, profilePic, firstname, lastname } = JSON.parse(storedUser);
          setFirstname(firstname || "none");
          setLastname(lastname || "none");
          setUsername(username || "Unknown");
          setEmail(email || "Not provided");
          setProfilePic(
            profilePic || "assets/images/profile.png"
          );
        }
      } catch (err) {
        console.log("Error loading profile:", err);
      }
    };

    loadProfile();
  }, []);

  // 🔹 Logout function
  const handleLogout = async () => {
    setLoading(true);
    try {
      const auth = getAuth(app);
      await signOut(auth);
      await AsyncStorage.removeItem("user"); // ✅ Clear user data
      router.replace("/"); // Back to landing/login
    } catch (err) {
      console.error("Logout failed:", err);
      Alert.alert("Logout failed", err?.message || "Please try again.");
      router.replace("/home"); // fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={{ uri: profilePic }} style={styles.profilePic} />

      {/* User Info */}
      <Text style={styles.title}>👤 Profile</Text>
      <Text style={styles.info}>Fullname: {firstname} {lastname}</Text>
      <Text style={styles.info}>Username: {username}</Text>
      <Text style={styles.info}>Email: {email}</Text>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.logoutText}>Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
