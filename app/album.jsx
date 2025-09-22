// app/album.jsx
import { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";

export default function Album() {
  const [songs, setSongs] = useState([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadSongs = async () => {
        const stored = await AsyncStorage.getItem("songs");
        setSongs(stored ? JSON.parse(stored) : []);
      };
      loadSongs();
    }, [])
  );

  const deleteSong = async (id) => {
    const updated = songs.filter((s) => s.id !== id);
    setSongs(updated);
    await AsyncStorage.setItem("songs", JSON.stringify(updated));
    Alert.alert("🗑️ Deleted", "Song has been removed.");
  };

  const grouped = songs.reduce((acc, song) => {
    if (!acc[song.album]) acc[song.album] = [];
    acc[song.album].push(song);
    return acc;
  }, {});

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={Object.keys(grouped)}
      keyExtractor={(album) => album}
      renderItem={({ item: album }) => (
        <View style={styles.albumBox}>
          <Text style={styles.albumTitle}>💿 {album}</Text>
          {grouped[album].map((song) => (
            <View key={song.id} style={styles.songItem}>
              <TouchableOpacity
                onPress={() =>
                  router.push({ pathname: "/songDetails", params: song })
                }
              >
                <Text style={styles.songTitle}>🎵 {song.title}</Text>
              </TouchableOpacity>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: "/editSong", params: song })
                  }
                >
                  <Text style={styles.edit}>✏️ Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteSong(song.id)}>
                  <Text style={styles.delete}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  albumBox: { marginBottom: 25 },
  albumTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  songItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  songTitle: { fontSize: 16 },
  actions: { flexDirection: "row", gap: 10 },
  edit: { color: "blue" },
  delete: { color: "red" },
});
