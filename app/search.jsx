import { View, Text, StyleSheet } from "react-native";

export default function SearchPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Search</Text>
      <Text>Search functionality will be added here...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
