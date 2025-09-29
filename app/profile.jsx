import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
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
  const [editing, setEditing] = useState(false); // 🔹 edit state
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const { username, email, profilePic, firstname, lastname } =
            JSON.parse(storedUser);
          setFirstname(firstname || "none");
          setLastname(lastname || "none");
          setUsername(username || "Unknown");
          setEmail(email || "Not provided");
          setProfilePic(profilePic || "assets/images/profile.png");
        }
      } catch (err) {
        console.log("Error loading profile:", err);
      }
    };

    loadProfile();
  }, []);

  // 🔹 Save edits
  const handleSave = async () => {
    try {
      const updatedUser = {
        firstname,
        lastname,
        username,
        email,
        profilePic,
      };
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      Alert.alert("✅ Success", "Profile updated!");
      setEditing(false);
    } catch (err) {
      console.error("Save failed:", err);
      Alert.alert("Save failed", "Could not update profile.");
    }
  };

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

      <Text style={styles.title}>👤 Profile</Text>

      {editing ? (
        <>
          {/* Editable fields */}
          <TextInput
            style={styles.input}
            value={firstname}
            onChangeText={setFirstname}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={lastname}
            onChangeText={setLastname}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: "green" }]}
            onPress={handleSave}
          >
            <Text style={styles.mainButtonText}>Save Changes</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: "gray" }]}
            onPress={() => setEditing(false)}
          >
            <Text style={styles.mainButtonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Display Info */}
          <Text style={styles.info}>
            Fullname: {firstname} {lastname}
          </Text>
          <Text style={styles.info}>Username: {username}</Text>
          <Text style={styles.info}>Email: {email}</Text>

          {/* Edit button styled like logout */}
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: "#2196F3" }]}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.mainButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Logout */}
      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: "red" }]}
        onPress={handleLogout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.mainButtonText}>Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
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
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  mainButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  mainButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
