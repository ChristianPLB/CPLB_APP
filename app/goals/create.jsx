// app/createSong.jsx
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateSong() {
  const router = useRouter();

  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");

  const handleSave = async () => {
    if (!artist || !album || !title || !lyrics) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    const newSong = { id: Date.now().toString(), artist, album, title, lyrics };

    try {
      const existing = await AsyncStorage.getItem("songs");
      const songs = existing ? JSON.parse(existing) : [];
      songs.push(newSong);
      await AsyncStorage.setItem("songs", JSON.stringify(songs));

      Alert.alert("✅ Success", "Song has been created!");

      router.push("/home"); // Redirect to Artist page after save
    } catch (error) {
      console.error("Error saving song:", error);
      Alert.alert("Error", "Failed to save song!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}> Create a New Song</Text>

      <TextInput
        style={styles.input}
        placeholder="Artist Name"
        value={artist}
        onChangeText={setArtist}
      />

      <TextInput
        style={styles.input}
        placeholder="Album Name"
        value={album}
        onChangeText={setAlbum}
      />

      <TextInput
        style={styles.input}
        placeholder="Song Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.lyricsInput]}
        placeholder="Lyrics"
        value={lyrics}
        onChangeText={setLyrics}
        multiline
      />

      <Button title="Save Song" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  lyricsInput: {
    height: 120,
    textAlignVertical: "top",
  },
});
