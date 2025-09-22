// app/lyrics/[id].jsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, Button } from "react-native";

// Fake shared data (replace with context/Firebase later)
const lyricsList = [
  { id: "1", title: "Shape of You", text: "Lyrics of Shape of You..." },
  { id: "2", title: "Blinding Lights", text: "Lyrics of Blinding Lights..." },
];

export default function LyricsDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Find the lyrics by ID
  const song = lyricsList.find((l) => l.id === id);

  if (!song) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Lyrics not found ❌</Text>
        <Button title="Back" onPress={() => router.back()} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.lyrics}>{song.text}</Text>
      <Button title="Back" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  lyrics: { fontSize: 16, lineHeight: 24, color: "#333" },
});
