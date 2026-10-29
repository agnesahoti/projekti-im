const ditet = ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Sht"];
const muajt = [
  "janar",
  "shkurt",
  "mars",
  "prill",
  "maj",
  "qershor",
  "korrik",
  "gusht",
  "shtator",
  "tetor",
  "nëntor",
  "dhjetor",
];

export type Dita = {
  emriDites: string;
  numri: number;
  etiketa: string;
};

// Kthen "n" ditët e radhës, duke filluar nga sot.
export function gjejDitet(n: number): Dita[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const emriDites = ditet[d.getDay()];
    const numri = d.getDate();
    return {
      emriDites,
      numri,
      etiketa: `${emriDites} ${numri} ${muajt[d.getMonth()].slice(0, 3)}`,
    };
  });
}

export function sotTekst(): string {
  const d = new Date();
  return `${ditet[d.getDay()]} ${d.getDate()} ${muajt[d.getMonth()]}`;
}

export function muajiTekst(): string {
  const m = muajt[new Date().getMonth()];
  return m.charAt(0).toUpperCase() + m.slice(1) + " " + new Date().getFullYear();
}