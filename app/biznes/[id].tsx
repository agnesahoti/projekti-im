import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ngjyrat } from "../../constants/ngjyrat";
import { useTermini } from "../../context/TerminiContext";
import { bizneset } from "../../data/bizneset";
import { gjejDitet, muajiTekst } from "../../utils/data";

export default function ZgjedhTerminin() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { rezervo } = useTermini();

  const biznes = bizneset.find((b) => b.id === id);

  const [sherbimi, setSherbimi] = useState(0);
  const [dita, setDita] = useState(0);
  const [ora, setOra] = useState<string | null>(null);

  if (!biznes) {
    return <Text style={styles.gabim}>Biznesi nuk u gjet.</Text>;
  }

  const ditet = gjejDitet(4);
  const sh = biznes.sherbimet[sherbimi];

  const konfirmo = () => {
    if (!ora) {
      Alert.alert("Zgjidh orën", "Zgjidh një orë para se të rezervosh.");
      return;
    }
    rezervo({
      biznesId: biznes.id,
      biznesEmri: biznes.emri,
      sherbimi: sh.emri,
      kohezgjatja: sh.kohezgjatja,
      cmimi: sh.cmimi,
      data: ditet[dita].etiketa,
      ora,
      para: biznes.radha,
    });
    router.replace("/terminet");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: biznes.emri }} />

      <ScrollView contentContainerStyle={styles.permbajtja}>
        <View style={styles.vendi}>
          <Ionicons name="location-outline" size={15} color={ngjyrat.gri} />
          <Text style={styles.info}>
            {biznes.distanca} nga ti · {biznes.orari}
          </Text>
        </View>

        <Text style={styles.seksioni}>Shërbimi</Text>
        {biznes.sherbimet.map((s, i) => {
          const zgjedhur = sherbimi === i;
          return (
            <Pressable
              key={s.emri}
              style={[styles.rresht, zgjedhur && styles.rreshtAktiv]}
              onPress={() => setSherbimi(i)}
              accessibilityRole="radio"
              accessibilityState={{ selected: zgjedhur }}
            >
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.sherbimEmri}>{s.emri}</Text>
                <Text style={styles.sherbimKoha}>{s.kohezgjatja}</Text>
              </View>
              <Text style={styles.cmimi}>{s.cmimi}</Text>
              {zgjedhur ? (
                <View style={styles.radioAktiv}>
                  <Ionicons name="checkmark" size={14} color={ngjyrat.bardhe} />
                </View>
              ) : (
                <View style={styles.radio} />
              )}
            </Pressable>
          );
        })}

        <Text style={styles.seksioni}>{muajiTekst()}</Text>
        <View style={styles.ditet}>
          {ditet.map((d, i) => {
            const aktive = dita === i;
            return (
              <Pressable
                key={d.etiketa}
                style={[styles.dita, aktive && styles.ditaAktive]}
                onPress={() => setDita(i)}
                accessibilityState={{ selected: aktive }}
              >
                <Text style={[styles.ditaEmri, aktive && styles.ditaTekstAktiv]}>
                  {d.emriDites}
                </Text>
                <Text style={[styles.ditaNumri, aktive && styles.ditaTekstAktiv]}>
                  {d.numri}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.seksioni}>Ora</Text>
        <View style={styles.oret}>
          {biznes.oret.map((o) => {
            const zene = biznes.zena.includes(o);
            const aktive = ora === o;
            return (
              <Pressable
                key={o}
                disabled={zene}
                style={[styles.ora, aktive && styles.oraAktive, zene && styles.oraZene]}
                onPress={() => setOra(o)}
                accessibilityState={{ selected: aktive, disabled: zene }}
              >
                <Text
                  style={[
                    styles.oraTekst,
                    aktive && styles.oraTekstAktive,
                    zene && styles.oraTekstZene,
                  ]}
                >
                  {o}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.poshte, { paddingBottom: insets.bottom + 12 }]}>
        <Text style={styles.permbledhje}>
          {ditet[dita].etiketa} · {ora ?? "zgjidh orën"} · {sh.emri} · {sh.cmimi}
        </Text>
        <Pressable style={styles.butoni} onPress={konfirmo}>
          <Text style={styles.butoniTekst}>Rezervo terminin</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ngjyrat.sfondi },
  gabim: { padding: 20, fontSize: 16 },
  permbajtja: { padding: 20, gap: 10 },
  vendi: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  info: { fontSize: 13, fontWeight: "500", color: ngjyrat.gri },
  seksioni: { fontSize: 16, fontWeight: "800", color: ngjyrat.teksti, marginTop: 10 },
  rresht: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 56,
    backgroundColor: ngjyrat.bardhe,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  rreshtAktiv: {
    borderWidth: 2,
    borderColor: ngjyrat.kryesore,
    backgroundColor: ngjyrat.kryesoreEZbehte,
  },
  sherbimEmri: { fontSize: 15, fontWeight: "700", color: ngjyrat.teksti },
  sherbimKoha: { fontSize: 12, fontWeight: "500", color: ngjyrat.griEErret },
  cmimi: { fontSize: 15, fontWeight: "800", color: ngjyrat.teksti },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: ngjyrat.kufiriIErret,
  },
  radioAktiv: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: ngjyrat.kryesore,
    alignItems: "center",
    justifyContent: "center",
  },
  ditet: { flexDirection: "row", gap: 10 },
  dita: {
    flex: 1,
    minHeight: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    backgroundColor: ngjyrat.bardhe,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  ditaAktive: { backgroundColor: ngjyrat.kryesore, borderColor: ngjyrat.kryesore },
  ditaEmri: { fontSize: 12, fontWeight: "600", color: ngjyrat.gri },
  ditaNumri: { fontSize: 18, fontWeight: "800", color: ngjyrat.teksti },
  ditaTekstAktiv: { color: ngjyrat.bardhe },
  oret: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  ora: {
    width: "31%",
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    backgroundColor: ngjyrat.bardhe,
    alignItems: "center",
    justifyContent: "center",
  },
  oraAktive: {
    borderWidth: 2,
    borderColor: ngjyrat.kryesore,
    backgroundColor: ngjyrat.kryesoreEZbehte,
  },
  oraZene: { backgroundColor: ngjyrat.joAktiv },
  oraTekst: { fontSize: 15, fontWeight: "700", color: ngjyrat.teksti },
  oraTekstAktive: { color: ngjyrat.kryesoreEErret, fontWeight: "800" },
  oraTekstZene: { color: ngjyrat.gri, fontWeight: "600", textDecorationLine: "line-through" },
  poshte: {
    paddingTop: 14,
    paddingHorizontal: 20,
    gap: 10,
    backgroundColor: ngjyrat.bardhe,
    borderTopWidth: 1,
    borderTopColor: ngjyrat.kufiri,
  },
  permbledhje: { fontSize: 13, fontWeight: "600", color: ngjyrat.gri, textAlign: "center" },
  butoni: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: ngjyrat.kryesore,
    alignItems: "center",
    justifyContent: "center",
  },
  butoniTekst: { color: ngjyrat.bardhe, fontSize: 16, fontWeight: "800" },
});