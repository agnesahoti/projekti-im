import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ngjyrat } from "../constants/ngjyrat";
import type { Biznes } from "../data/bizneset";

type Props = { biznes: Biznes; onPress: () => void };

function etiketa(b: Biznes): string {
  if (b.radha > 0) {
    return `Radha tani: ${b.radha} ${b.radha === 1 ? "person" : "persona"}`;
  }
  if (b.terminiPare) return `Termini i parë: sot ${b.terminiPare}`;
  return "Pa radhë tani";
}

export default function BiznesKarte({ biznes, onPress }: Props) {
  return (
    <Pressable
      style={styles.karta}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={biznes.emri}
    >
      <View style={styles.ikona}>
        <Ionicons name={biznes.ikona} size={26} color={ngjyrat.kryesoreEErret} />
      </View>

      <View style={styles.tekstet}>
        <Text style={styles.emri}>{biznes.emri}</Text>
        <Text style={styles.info}>
          {biznes.kategoria} · {biznes.distanca} · {biznes.orari}
        </Text>
        <View style={styles.etiketa}>
          <Text style={styles.etiketaTekst}>{etiketa(biznes)}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={ngjyrat.gri} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  karta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: ngjyrat.bardhe,
    borderWidth: 1,
    borderColor: ngjyrat.kufiri,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },
  ikona: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: ngjyrat.kryesoreEZbehte,
    alignItems: "center",
    justifyContent: "center",
  },
  tekstet: { flex: 1, gap: 4 },
  emri: { fontSize: 16, fontWeight: "700", color: ngjyrat.teksti },
  info: { fontSize: 13, fontWeight: "500", color: ngjyrat.gri },
  etiketa: {
    alignSelf: "flex-start",
    backgroundColor: ngjyrat.kryesoreEZbehte,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  etiketaTekst: { fontSize: 12, fontWeight: "700", color: ngjyrat.kryesoreEErret },
});