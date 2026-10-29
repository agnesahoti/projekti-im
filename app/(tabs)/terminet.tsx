import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ngjyrat } from "../../constants/ngjyrat";
import { useTermini } from "../../context/TerminiContext";

const MINUTA_PER_KLIENT = 12; // supozim i thjeshtë për kohën e pritjes

export default function Terminet() {
  const router = useRouter();
  const { termini, anulo } = useTermini();

  if (!termini) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Text style={styles.titulli}>Termini im</Text>
        <View style={styles.bosh}>
          <Ionicons name="calendar-outline" size={48} color={ngjyrat.gri} />
          <Text style={styles.boshTitulli}>Nuk ke asnjë termin</Text>
          <Text style={styles.boshTekst}>
            Zgjidh një biznes nga kryefaqja dhe rezervo terminin tënd.
          </Text>
          <Pressable style={styles.butoni} onPress={() => router.navigate("/")}>
            <Text style={styles.butoniTekst}>Gjej një biznes</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const personaParaTeje = Math.min(termini.para, 3);
  const pritja = termini.para * MINUTA_PER_KLIENT;

  const konfirmoAnulimin = () => {
    Alert.alert("Anulo terminin", "A je i sigurt që do ta anulosh terminin?", [
      { text: "Jo", style: "cancel" },
      { text: "Po, anulo", style: "destructive", onPress: anulo },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.permbajtja} showsVerticalScrollIndicator={false}>
        <Text style={styles.titulli}>Termini im</Text>

        <View style={styles.karta}>
          <View style={styles.konfirmimi}>
            <View style={styles.tiku}>
              <Ionicons name="checkmark" size={22} color={ngjyrat.bardhe} />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={styles.konfirmimiTitulli}>Termini u rezervua</Text>
              <Text style={styles.konfirmimiNen}>Të kemi dërguar edhe një kujtesë</Text>
            </View>
          </View>
          <View style={styles.vija} />
          <View style={styles.rresht}>
            <Ionicons name="storefront-outline" size={18} color={ngjyrat.gri} />
            <Text style={styles.rreshtTekstKryesor}>{termini.biznesEmri}</Text>
          </View>
          <View style={styles.rresht}>
            <Ionicons name="calendar-outline" size={18} color={ngjyrat.gri} />
            <Text style={styles.rreshtTekst}>
              {termini.data} · {termini.ora}
            </Text>
          </View>
          <View style={styles.rresht}>
            <Ionicons name="time-outline" size={18} color={ngjyrat.gri} />
            <Text style={styles.rreshtTekst}>
              {termini.sherbimi} · {termini.kohezgjatja} · {termini.cmimi}
            </Text>
          </View>
        </View>

        <View style={styles.radha}>
          <Text style={styles.radhaEtiketa}>RADHA LIVE</Text>
          <View style={styles.radhaNumrat}>
            <View>
              <Text style={styles.radhaMadhe}>{termini.para}</Text>
              <Text style={styles.radhaNen}>
                {termini.para === 1 ? "person para teje" : "persona para teje"}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.radhaKoha}>
                {termini.para === 0 ? "Tani" : `~${pritja} min`}
              </Text>
              <Text style={styles.radhaNen}>koha e pritur</Text>
            </View>
          </View>
          <View style={styles.persona}>
            {Array.from({ length: personaParaTeje }, (_, i) => (
              <View key={i} style={styles.personaPika} />
            ))}
            <View style={styles.personaVija} />
            <View style={styles.ti}>
              <Text style={styles.tiTekst}>Ti</Text>
            </View>
          </View>
          <Text style={styles.radhaShenim}>
            Do të njoftohesh kur të të mbetet vetëm një person para.
          </Text>
        </View>

        <Pressable style={styles.butoniDytesor} onPress={konfirmoAnulimin}>
          <Text style={styles.butoniDytesorTekst}>Anulo terminin</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ngjyrat.sfondi },
  permbajtja: { paddingHorizontal: 20, paddingBottom: 24, gap: 18 },
  titulli: {
    fontSize: 26,
    fontWeight: "800",
    color: ngjyrat.teksti,
    marginTop: 12,
    paddingHorizontal: 20,
  },
  bosh: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 32 },
  boshTitulli: { fontSize: 18, fontWeight: "800", color: ngjyrat.teksti },
  boshTekst: { fontSize: 14, color: ngjyrat.gri, textAlign: "center" },
  butoni: {
    minHeight: 52,
    paddingHorizontal: 28,
    borderRadius: 16,
    backgroundColor: ngjyrat.kryesore,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  butoniTekst: { color: ngjyrat.bardhe, fontSize: 15, fontWeight: "800" },
  karta: {
    gap: 14,
    padding: 18,
    backgroundColor: ngjyrat.bardhe,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    borderRadius: 20,
  },
  konfirmimi: { flexDirection: "row", alignItems: "center", gap: 12 },
  tiku: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ngjyrat.kryesore,
    alignItems: "center",
    justifyContent: "center",
  },
  konfirmimiTitulli: { fontSize: 17, fontWeight: "800", color: ngjyrat.teksti },
  konfirmimiNen: { fontSize: 13, fontWeight: "500", color: ngjyrat.gri },
  vija: { height: 1, backgroundColor: ngjyrat.kufiri },
  rresht: { flexDirection: "row", alignItems: "center", gap: 10 },
  rreshtTekstKryesor: { fontSize: 15, fontWeight: "700", color: ngjyrat.teksti, flex: 1 },
  rreshtTekst: { fontSize: 14, fontWeight: "600", color: ngjyrat.griEErret, flex: 1 },
  radha: {
    gap: 16,
    padding: 20,
    backgroundColor: ngjyrat.naten,
    borderRadius: 20,
  },
  radhaEtiketa: { fontSize: 13, fontWeight: "700", letterSpacing: 0.6, color: "#A9D8C8" },
  radhaNumrat: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  radhaMadhe: { fontSize: 44, lineHeight: 48, fontWeight: "800", color: ngjyrat.bardhe },
  radhaKoha: { fontSize: 26, fontWeight: "800", color: ngjyrat.bardhe },
  radhaNen: { fontSize: 14, fontWeight: "600", color: "#D5DCE4" },
  persona: { flexDirection: "row", alignItems: "center", gap: 10 },
  personaPika: { width: 34, height: 34, borderRadius: 17, backgroundColor: ngjyrat.gri },
  personaVija: { flex: 1, height: 2, backgroundColor: ngjyrat.griEErret },
  ti: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: ngjyrat.kryesore,
    alignItems: "center",
    justifyContent: "center",
  },
  tiTekst: { fontSize: 13, fontWeight: "800", color: ngjyrat.bardhe },
  radhaShenim: { fontSize: 13, fontWeight: "500", lineHeight: 18, color: "#D5DCE4" },
  butoniDytesor: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    backgroundColor: ngjyrat.bardhe,
    alignItems: "center",
    justifyContent: "center",
  },
  butoniDytesorTekst: { fontSize: 15, fontWeight: "700", color: ngjyrat.teksti },
});