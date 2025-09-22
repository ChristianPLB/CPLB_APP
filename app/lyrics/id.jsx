import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, ScrollView, StyleSheet, Text } from "react-native";

export default function LyricsPage() {
  const { id } = useLocalSearchParams(); // song name / id
  const router = useRouter();

  // 🔹 Replace with API fetch later
  const lyrics = `Lyrics for "${id}" will appear here...`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{id}</Text>
      <Text style={styles.lyrics}>{lyrics}</Text>
      <Button title="Back to Search" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  lyrics: { fontSize: 16, lineHeight: 24, color: "#333" },
});
