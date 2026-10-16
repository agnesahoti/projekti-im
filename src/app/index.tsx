import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [clicked, setClicked] = useState(false);
  const [numri, setNumri] = useState(0);

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

        <Pressable
          style={styles.button}
          onPress={() => setClicked(!clicked)}
        >
          <Text style={styles.buttonText}>
            {clicked ? "Klikove me sukses! ✓" : "Kliko ketu"}
          </Text>
        </Pressable>

        <Text style={styles.counter}>
          Numri i klikimeve: {numri}
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => setNumri(n => n + 1)}
        >
          <Text style={styles.buttonText}>
            Rrit numrin +1
          </Text>
        </Pressable>

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
  button: {
    backgroundColor: "#2457C5",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  counter: {
    fontSize: 16,
    color: "#2457C5",
    fontWeight: "bold",
    marginTop: 20,
  },
  footer: {
    marginTop: 24,
    fontSize: 12,
    color: "#2457C5",
    textAlign: "center",
  },
});
