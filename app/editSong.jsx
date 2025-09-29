import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EditSong() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Load initial data from params
    const [title, setTitle] = useState(params.title || "");
    const [artist, setArtist] = useState(params.artist || "");
    const [album, setAlbum] = useState(params.album || "");
    const [lyrics, setLyrics] = useState(params.lyrics || "");

    const handleUpdate = async () => {
        if (!title || !artist) {
            Alert.alert("⚠️ Missing Fields", "Title and Artist are required.");
            return;
        }

        const stored = await AsyncStorage.getItem("songs");
        const songs = stored ? JSON.parse(stored) : [];

        // Update song
        const updatedSongs = songs.map((s) =>
            s.id === params.id ? { ...s, title, artist, album, lyrics } : s
        );

        await AsyncStorage.setItem("songs", JSON.stringify(updatedSongs));
        Alert.alert("✅ Updated", "Song details have been updated.");
        router.back(); // Go back to previous page
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>✏️ Edit Song</Text>

            <TextInput
                style={styles.input}
                placeholder="Song Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Artist"
                value={artist}
                onChangeText={setArtist}
            />
            <TextInput
                style={styles.input}
                placeholder="Album"
                value={album}
                onChangeText={setAlbum}
            />
            <TextInput
                style={[styles.input, styles.lyricsInput]}
                placeholder="Lyrics"
                value={lyrics}
                onChangeText={setLyrics}
                multiline
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
                <Text style={styles.saveText}>💾 Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
    },
    lyricsInput: {
        height: 150, // bigger space for lyrics
    },
    saveBtn: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
    },
    saveText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
