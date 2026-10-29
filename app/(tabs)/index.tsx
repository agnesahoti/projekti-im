import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BiznesKarte from "../../components/BiznesKarte";
import { ngjyrat } from "../../constants/ngjyrat";
import { bizneset, kategorite } from "../../data/bizneset";

export default function Kryefaqja() {
  const router = useRouter();
  const [kategoria, setKategoria] = useState("Të gjitha");
  const [kerkimi, setKerkimi] = useState("");

  const lista = bizneset.filter(
    (b) =>
      (kategoria === "Të gjitha" || b.kategoria === kategoria) &&
      b.emri.toLowerCase().includes(kerkimi.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.krye}>
        <View style={{ gap: 4 }}>
          <Text style={styles.pershendetje}>Mirëdita</Text>
          <Text style={styles.titulli}>Gjej terminin tënd</Text>
        </View>
        <Pressable style={styles.zilja} accessibilityLabel="Njoftimet">
          <Ionicons name="notifications-outline" size={22} color={ngjyrat.teksti} />
        </Pressable>
      </View>

      <View style={styles.kerkimi}>
        <Ionicons name="search-outline" size={20} color={ngjyrat.gri} />
        <TextInput
          style={styles.input}
          placeholder="Kërko biznes ose shërbim"
          placeholderTextColor={ngjyrat.gri}
          value={kerkimi}
          onChangeText={setKerkimi}
          accessibilityLabel="Kërko biznes ose shërbim"
        />
      </View>

      <View style={styles.chips}>
        {kategorite.map((k) => (
          <Pressable
            key={k}
            style={[styles.chip, kategoria === k && styles.chipAktiv]}
            onPress={() => setKategoria(k)}
          >
            <Text style={[styles.chipTekst, kategoria === k && styles.chipTekstAktiv]}>
              {k}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.seksioni}>Afër teje</Text>

      <FlatList
        data={lista}
        keyExtractor={(b) => b.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.bosh}>Nuk u gjet asnjë biznes.</Text>}
        renderItem={({ item }) => (
          <BiznesKarte
            biznes={item}
            onPress={() =>
              router.push({ pathname: "/biznes/[id]", params: { id: item.id } })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ngjyrat.sfondi, paddingHorizontal: 20 },
  krye: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 18,
  },
  pershendetje: { fontSize: 14, fontWeight: "600", color: ngjyrat.gri },
  titulli: { fontSize: 26, fontWeight: "800", color: ngjyrat.teksti },
  zilja: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    backgroundColor: ngjyrat.bardhe,
    alignItems: "center",
    justifyContent: "center",
  },
  kerkimi: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: ngjyrat.bardhe,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    borderRadius: 16,
    marginBottom: 16,
  },
  input: { flex: 1, fontSize: 15, fontWeight: "500", color: ngjyrat.teksti },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  chip: {
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    backgroundColor: ngjyrat.bardhe,
    alignItems: "center",
    justifyContent: "center",
  },
  chipAktiv: { backgroundColor: ngjyrat.kryesore, borderColor: ngjyrat.kryesore },
  chipTekst: { fontSize: 14, fontWeight: "600", color: ngjyrat.teksti },
  chipTekstAktiv: { color: ngjyrat.bardhe, fontWeight: "700" },
  seksioni: { fontSize: 18, fontWeight: "800", color: ngjyrat.teksti, marginBottom: 12 },
  bosh: { fontSize: 15, color: ngjyrat.gri, textAlign: "center", marginTop: 24 },
});