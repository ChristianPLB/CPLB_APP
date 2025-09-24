// app/search.jsx
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadSongs = async () => {
      const stored = await AsyncStorage.getItem("songs");
      const parsed = stored ? JSON.parse(stored) : [];
      setSongs(parsed);
      setFiltered(parsed);
    };
    loadSongs();
  }, []);

  // 🔍 Handle search
  const handleSearch = (text) => {
    setQuery(text);
    if (!text.trim()) {
      setFiltered(songs);
      return;
    }
    const results = songs.filter(
      (s) =>
        s.title.toLowerCase().includes(text.toLowerCase()) ||
        s.artist.toLowerCase().includes(text.toLowerCase()) ||
        (s.album && s.album.toLowerCase().includes(text.toLowerCase())) ||
        (s.lyrics && s.lyrics.toLowerCase().includes(text.toLowerCase()))
    );
    setFiltered(results);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Search</Text>

      {/* Search Box */}
      <TextInput
        style={styles.input}
        placeholder="Search by title, artist, album, or lyrics..."
        value={query}
        onChangeText={handleSearch}
      />

      {/* Results */}
      {filtered.length > 0 ? (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => router.push({ pathname: "/songDetails", params: item })}
            >
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songSubtitle}>{item.artist}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResults}>No results found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  songTitle: { fontSize: 18, fontWeight: "600" },
  songSubtitle: { fontSize: 14, color: "#555" },
  noResults: { marginTop: 20, fontSize: 16, textAlign: "center", color: "#777" },
});
