import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View, Image } from "react-native";
import { auth } from "../config/FirebaseConfig";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(false);
      if (firebaseUser) {
        router.replace("/home");
      }
    });

    return unsubscribe;
  }, [router]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Image above the text */}
      <Image
        source={require("../assets/images/lyrix.png")} // put your image in assets folder
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to LyriX</Text>
      <Text style={styles.subtitle}>
        Every lyric, always with you.{"\n"}
        Sing along made simple.
      </Text>
      <View style={styles.buttonWrapper}>
        <Button title="Get Started" onPress={() => router.push("/login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 290,
    height: 290,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonWrapper: {
    width: "60%",
    marginVertical: 8,
  },
});
