import { createContext, useContext, useMemo, useState } from "react";
import { LANGS, t as makeT } from "./i18n";

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(LANGS.AR); // عربي افتراضيًا

  const value = useMemo(() => {
    return {
      lang,
      setLang,
      isAR: lang === LANGS.AR,
      tr: makeT(lang),
    };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
