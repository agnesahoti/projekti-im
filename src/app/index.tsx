import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>📱</Text>

        <Text style={styles.title}>
          Pershendetje!
        </Text>

        <Text style={styles.subtitle}>
          Mire se vini ne aplikacionin tim te pare.
        </Text>

        <View style={styles.line} />

        <Text style={styles.message}>
          Ky projekt eshte krijuar me React Native dhe Expo.
        </Text>

        <Text style={styles.footer}>
          Zhvillimi i Aplikacioneve Mobile
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 26,
    alignItems: "center",
    elevation: 5,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2457C5",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    color: "#374151",
    textAlign: "center",
    lineHeight: 25,
  },
  line: {
    width: 70,
    height: 4,
    backgroundColor: "#60A5FA",
    borderRadius: 5,
    marginVertical: 22,
  },
  message: {
    fontSize: 15,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 23,
  },
  footer: {
    marginTop: 24,
    fontSize: 12,
    color: "#2457C5",
    textAlign: "center",
  },
});
