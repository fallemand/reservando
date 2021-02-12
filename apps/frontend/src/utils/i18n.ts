import Vue from "vue";
import VueI18n from "vue-i18n";
import gettexts from "../gettexts.json";

const LOCALE_SPANISH = "es";

Vue.use(VueI18n);

// Custom Formatter implementation
const formatter = {
  // eslint-disable-next-line
  interpolate: (message, values) => [message.replace(/%(\d+)/g, (_, m) => values[--m])],
};

const i18n = new VueI18n({
  locale: LOCALE_SPANISH,
  formatter,
  silentTranslationWarn: true,
  messages: gettexts,
});

export default i18n;
