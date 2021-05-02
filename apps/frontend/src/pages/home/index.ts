import "core-js/stable";
import { createApp } from "vue";
import initializePage from "@/utils/initialize-page";
import i18n from "@/utils/i18n";
import plugins from "@/utils/vue-plugins";
import SignupPage from "./HomePage.vue";
import { store, key } from "./store";

(async () => {
  const user = await initializePage({ requiredRole: "admin" });
  createApp(SignupPage).use(i18n).use(store, key).use(plugins, user).mount("#app");
})();
