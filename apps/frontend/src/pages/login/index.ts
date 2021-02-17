import "core-js/stable";
import { createApp } from "vue";
import initializePage from "@/utils/initialize-page";
import i18n from "@/utils/i18n";
import LoginPage from "./LoginPage.vue";
import plugins from "@/utils/vue-plugins";

initializePage({
  redirectIfLoggedIn: true,
})
  .then((user): void => {
    createApp(LoginPage).use(i18n).use(plugins, user).mount("#app");
  })
  .catch((e) => e);
