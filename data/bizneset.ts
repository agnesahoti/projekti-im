import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type IkonaEmri = ComponentProps<typeof Ionicons>["name"];

export type Kategoria = "Berber" | "Mjek" | "Salon";

export type Sherbim = {
  emri: string;
  kohezgjatja: string;
  cmimi: string;
};

export type Biznes = {
  id: string;
  emri: string;
  kategoria: Kategoria;
  ikona: IkonaEmri;
  distanca: string;
  orari: string;
  radha: number; // sa persona presin tani
  terminiPare?: string; // përdoret kur nuk ka radhë
  sherbimet: Sherbim[];
  oret: string[]; // të gjitha orët e ditës
  zena: string[]; // orët që janë të zëna
};

export const kategorite = ["Të gjitha", "Berber", "Mjek", "Salon"];

export const bizneset: Biznes[] = [
  {
    id: "1",
    emri: "Berbershop Premium",
    kategoria: "Berber",
    ikona: "cut-outline",
    distanca: "450 m",
    orari: "Hapur deri 20:00",
    radha: 2,
    sherbimet: [
      { emri: "Qethje flokësh", kohezgjatja: "30 min", cmimi: "5 €" },
      { emri: "Qethje + mjekër", kohezgjatja: "45 min", cmimi: "8 €" },
      { emri: "Rregullim mjekre", kohezgjatja: "15 min", cmimi: "3 €" },
    ],
    oret: ["15:30", "16:00", "16:30", "17:00", "17:30", "18:30"],
    zena: ["16:00"],
  },
  {
    id: "2",
    emri: "Ambulanca Dita",
    kategoria: "Mjek",
    ikona: "medkit-outline",
    distanca: "1.2 km",
    orari: "Hapur deri 17:00",
    radha: 0,
    terminiPare: "16:30",
    sherbimet: [
      { emri: "Konsultë e përgjithshme", kohezgjatja: "20 min", cmimi: "10 €" },
      { emri: "Kontroll i përsëritur", kohezgjatja: "15 min", cmimi: "6 €" },
    ],
    oret: ["15:00", "15:30", "16:00", "16:30"],
    zena: ["15:00", "15:30", "16:00"],
  },
  {
    id: "3",
    emri: "Salon Elira",
    kategoria: "Salon",
    ikona: "sparkles-outline",
    distanca: "800 m",
    orari: "Hapur deri 19:00",
    radha: 0,
    sherbimet: [
      { emri: "Qethje dhe feston", kohezgjatja: "40 min", cmimi: "12 €" },
      { emri: "Manikyr", kohezgjatja: "30 min", cmimi: "8 €" },
    ],
    oret: ["15:00", "16:00", "17:00", "18:00"],
    zena: [],
  },
];