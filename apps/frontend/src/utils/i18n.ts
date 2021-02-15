import { createI18n } from "vue-i18n";
import gettexts from "../gettexts.json";

const LOCALE_SPANISH = "es";

// Custom Formatter implementation
const formatter = {
  // eslint-disable-next-line
  interpolate: (message, values) => [message.replace(/%(\d+)/g, (_, m) => values[--m])],
};

const i18n = createI18n({
  legacy: false,
  formatter,
  locale: LOCALE_SPANISH,
  messages: gettexts,
});

export default i18n;
