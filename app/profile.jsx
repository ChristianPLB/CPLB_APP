// app/profile.jsx
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { app } from "../config/FirebaseConfig";

export default function Profile() {
  const router = useRouter();
  const auth = getAuth(app);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 My Profile</Text>

      {user ? (
        <>
          <Text style={styles.info}>Username: {user.username || "No username set"}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
        </>
      ) : (
        <Text style={styles.info}>Not logged in</Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Back to Home" onPress={() => router.push("/home")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 16, marginVertical: 5 },
});
