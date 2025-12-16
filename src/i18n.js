import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationSV from "./locales/sv/translation.json";

const resources = {
  en: { translation: translationEN },
  sv: { translation: translationSV }
};

// Get saved language from localStorage, else default to English
const savedLanguage = localStorage.getItem("appLanguage") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // 🔹 default English
    fallbackLng: "en",  // 🔹 fallback English
    interpolation: { escapeValue: false }
  });

export default i18n;
