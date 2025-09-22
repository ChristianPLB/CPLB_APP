// app/logout.jsx
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import * as FirebaseConfig from "../config/FirebaseConfig"; // safe import

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const doLogout = async () => {
      try {
        const authInstance = FirebaseConfig.auth || getAuth(FirebaseConfig.app);
        await signOut(authInstance);
        // sign-out succeeded — go to landing
        if (mounted) router.replace("/");
      } catch (err) {
        console.error("Logout failed:", err);
        Alert.alert("Logout failed", err?.message || "Please try again.");
        if (mounted) router.replace("/home"); // fallback to home
      } finally {
        if (mounted) setLoading(false);
      }
    };

    doLogout();

    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" />
          <Text style={styles.text}>Signing you out...</Text>
        </>
      ) : (
        <Text style={styles.text}>Redirecting...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  text: { marginTop: 12, fontSize: 16, color: "#333" },
});
