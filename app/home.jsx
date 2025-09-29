// app/home.jsx
import { useRouter, useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [songs, setSongs] = useState([]);

  // Load user once
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const { username } = JSON.parse(storedUser);
        setUsername(username || "");
      }
    };
    loadUser();
  }, []);

  // Reload songs whenever Home is focused
  useFocusEffect(
    useCallback(() => {
      const loadSongs = async () => {
        const storedSongs = await AsyncStorage.getItem("songs");
        if (storedSongs) {
          setSongs(JSON.parse(storedSongs));
        } else {
          setSongs([]); // Empty list if none saved yet
        }
      };
      loadSongs();
    }, [])
  );

  const renderSong = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "songDetails",
          params: {
            title: item.title,
            artist: item.artist,
            album: item.album,
            lyrics: item.lyrics || "", // if lyrics exist
          },
        })
      }
    >
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
        <Text style={styles.songAlbum}>{item.album}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Welcome */}
      <View style={styles.topLeft}>
        <Text style={styles.welcomeText}>Hello, {username} 👋</Text>
      </View>

      {/* Song List */}
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderSong}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
            No songs yet. Tap ➕ to add one!
          </Text>
        }
      />

      {/* Floating + Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/create")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/search")}
        >
          <Ionicons name="search" size={28} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/artist")}
        >
          <Ionicons name="person" size={28} color="#333333ff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/album")}
        >
          <Ionicons name="musical-notes" size={28} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="settings" size={28} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topLeft: { padding: 16 },
  welcomeText: { fontSize: 22, fontWeight: "600", color: "#333" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cover: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  songInfo: { flex: 1 },
  songTitle: { fontSize: 16, fontWeight: "bold", color: "#111" },
  songArtist: { fontSize: 14, color: "#555" },
  songAlbum: { fontSize: 12, color: "#777" },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
    paddingBottom: 40,
  },
  navButton: { flex: 1, alignItems: "center" },
  fab: {
    position: "absolute",
    bottom: 120,
    right: 20,
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
