import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./lang/en.json";
import ukLang from "./lang/uk.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enLang,
    },
    uk: {
      translation: ukLang,
    },
  },
  lng: "en",
  fallbackLng: "en",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
