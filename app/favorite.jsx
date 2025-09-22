import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function Favorites() {
  const router = useRouter();

  // 🔹 Sample favorite songs (replace with Firebase later)
  const [favorites, setFavorites] = useState([
    { id: "1", title: "Shape of You - Ed Sheeran" },
    { id: "2", title: "Blinding Lights - The Weeknd" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Your Favorite Lyrics</Text>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.songCard}>
              <Text style={styles.songText}>{item.title}</Text>
              <Button
                title="View Lyrics"
                onPress={() => router.push(`/lyrics/${item.title}`)}
              />
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No favorites yet.</Text>
      )}

      <View style={styles.backWrapper}>
        <Button title="⬅ Back to Home" onPress={() => router.replace("/home")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  songCard: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  songText: { fontSize: 16, marginBottom: 8 },
  emptyText: { fontSize: 16, color: "#888", textAlign: "center", marginTop: 40 },
  backWrapper: { marginTop: 20 },
});
