import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function SongDetails() {
    const { title, artist, album, lyrics } = useLocalSearchParams();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>{title}</Text>
            <Text style={styles.subText}>Artist: {artist}</Text>
            <Text style={styles.subText}>Album: {album || "Unknown"}</Text>

            <Text style={styles.section}>Lyrics</Text>
            <Text style={styles.lyrics}>{lyrics || "No lyrics added yet..."}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#fff" },
    header: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
    subText: { fontSize: 16, color: "#555", marginBottom: 5 },
    section: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
    lyrics: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333",
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
    },
});
