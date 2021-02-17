import "core-js/stable";
import { createApp } from "vue";
import initializePage from "@/utils/initialize-page";
import i18n from "@/utils/i18n";
import plugins from "@/utils/vue-plugins";
import SignupPage from "./SignupPage.vue";
import router from "./router";

(async () => {
  const user = await initializePage();
  createApp(SignupPage).use(router).use(i18n).use(plugins, user).mount("#app");
})();
