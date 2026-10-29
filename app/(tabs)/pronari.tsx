import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ngjyrat } from "../../constants/ngjyrat";
import { sotTekst } from "../../utils/data";

const orari = [
  { ora: "15:30", emri: "Besnik", sherbimi: "Qethje flokësh" },
  { ora: "16:00", emri: "Valon", sherbimi: "Qethje + mjekër" },
  { ora: "16:30", emri: "Dren", sherbimi: "Qethje flokësh" },
  { ora: "17:00", emri: "Lirim", sherbimi: "Rregullim mjekre" },
  { ora: "17:30", emri: "Arlind", sherbimi: "Qethje + mjekër" },
];

export default function Pronari() {
  // Indeksi i klientit që është tani në karrige.
  const [aktiv, setAktiv] = useState(1);

  const nukKaMe = aktiv >= orari.length;
  const nRadhe = Math.max(orari.length - aktiv - 1, 0);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.permbajtja} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 4, marginTop: 12 }}>
          <Text style={styles.nentitulli}>Pamja e pronarit · {sotTekst()}</Text>
          <Text style={styles.titulli}>Berbershop Premium</Text>
        </View>

        <View style={styles.statistikat}>
          <View style={styles.stat}>
            <Text style={styles.statNumri}>{orari.length}</Text>
            <Text style={styles.statEtiketa}>Termine sot</Text>
          </View>
          <View style={[styles.stat, styles.statE_gjelbert]}>
            <Text style={[styles.statNumri, { color: ngjyrat.kryesoreEErret }]}>{nRadhe}</Text>
            <Text style={[styles.statEtiketa, { color: ngjyrat.kryesoreEErret }]}>
              Në radhë tani
            </Text>
          </View>
        </View>

        <Text style={styles.seksioni}>Orari i sotëm</Text>

        {orari.map((t, i) => {
          const perfundoi = i < aktiv;
          const ngjrige = i === aktiv;
          return (
            <View
              key={t.ora}
              style={[
                styles.rresht,
                perfundoi && styles.rreshtPerfundoi,
                ngjrige && styles.rreshtAktiv,
              ]}
            >
              <Text style={[styles.ora, perfundoi && { color: ngjyrat.gri }]}>{t.ora}</Text>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={[styles.emri, perfundoi && { color: ngjyrat.griEErret }]}>
                  {t.emri}
                </Text>
                <Text style={styles.sherbimi}>{t.sherbimi}</Text>
              </View>
              <View
                style={[
                  styles.statusi,
                  perfundoi && { backgroundColor: ngjyrat.bardhe },
                  ngjrige && { backgroundColor: ngjyrat.kryesore },
                ]}
              >
                <Text
                  style={[
                    styles.statusiTekst,
                    perfundoi && { color: ngjyrat.griEErret },
                    ngjrige && { color: ngjyrat.bardhe },
                  ]}
                >
                  {perfundoi ? "Përfundoi" : ngjrige ? "Në karrige" : "Pret"}
                </Text>
              </View>
            </View>
          );
        })}

        <Pressable
          style={[styles.butoni, nukKaMe && styles.butoniJoAktiv]}
          disabled={nukKaMe}
          onPress={() => setAktiv((a) => a + 1)}
        >
          <Text style={styles.butoniTekst}>
            {nukKaMe ? "Nuk ka klientë të tjerë" : "Thirr klientin tjetër"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ngjyrat.sfondi },
  permbajtja: { paddingHorizontal: 20, paddingBottom: 24, gap: 12 },
  nentitulli: { fontSize: 14, fontWeight: "600", color: ngjyrat.gri },
  titulli: { fontSize: 26, fontWeight: "800", color: ngjyrat.teksti },
  statistikat: { flexDirection: "row", gap: 12, marginVertical: 6 },
  stat: {
    flex: 1,
    gap: 4,
    padding: 16,
    backgroundColor: ngjyrat.bardhe,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    borderRadius: 18,
  },
  statE_gjelbert: {
    backgroundColor: ngjyrat.kryesoreEZbehte,
    borderColor: ngjyrat.kryesoreKufi,
  },
  statNumri: { fontSize: 30, lineHeight: 34, fontWeight: "800", color: ngjyrat.teksti },
  statEtiketa: { fontSize: 13, fontWeight: "600", color: ngjyrat.gri },
  seksioni: { fontSize: 18, fontWeight: "800", color: ngjyrat.teksti, marginTop: 6 },
  rresht: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: ngjyrat.bardhe,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    borderRadius: 16,
  },
  rreshtPerfundoi: { backgroundColor: ngjyrat.joAktiv },
  rreshtAktiv: { borderWidth: 2, borderColor: ngjyrat.kryesore },
  ora: { width: 52, fontSize: 15, fontWeight: "800", color: ngjyrat.teksti },
  emri: { fontSize: 15, fontWeight: "700", color: ngjyrat.teksti },
  sherbimi: { fontSize: 12, fontWeight: "500", color: ngjyrat.gri },
  statusi: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: ngjyrat.kryesoreEZbehte,
  },
  statusiTekst: { fontSize: 12, fontWeight: "700", color: ngjyrat.kryesoreEErret },
  butoni: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: ngjyrat.kryesore,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  butoniJoAktiv: { backgroundColor: ngjyrat.kufiriIErret },
  butoniTekst: { color: ngjyrat.bardhe, fontSize: 16, fontWeight: "800" },
});