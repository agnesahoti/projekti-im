import { createContext, useContext, useState, type ReactNode } from "react";

export type Termin = {
  biznesId: string;
  biznesEmri: string;
  sherbimi: string;
  kohezgjatja: string;
  cmimi: string;
  data: string;
  ora: string;
  para: number; // sa persona janë para teje në radhë
};

type Vlerat = {
  termini: Termin | null;
  rezervo: (t: Termin) => void;
  anulo: () => void;
};

const TerminiContext = createContext<Vlerat | null>(null);

// E mbështjell gjithë aplikacionin, që çdo ekran ta shohë të njëjtin termin.
export function TerminiProvider({ children }: { children: ReactNode }) {
  const [termini, setTermini] = useState<Termin | null>(null);

  return (
    <TerminiContext.Provider
      value={{
        termini,
        rezervo: (t) => setTermini(t),
        anulo: () => setTermini(null),
      }}
    >
      {children}
    </TerminiContext.Provider>
  );
}

export function useTermini(): Vlerat {
  const vlerat = useContext(TerminiContext);
  if (!vlerat) {
    throw new Error("useTermini duhet përdorur brenda TerminiProvider");
  }
  return vlerat;
}