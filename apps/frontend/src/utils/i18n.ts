import { createI18n } from "vue-i18n";
import gettexts from "../gettexts.json";

const LOCALE_SPANISH = "es";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: LOCALE_SPANISH,
  messages: gettexts,
});

export default i18n;
