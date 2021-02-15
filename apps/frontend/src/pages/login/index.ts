import "core-js/stable";
import { createApp } from "vue";
import initializePage from "@Utils/initialize-page";
import i18n from "@Utils/i18n";
import LoginPage from "./LoginPage.vue";
import plugins from "@Utils/vue-plugins";

initializePage({
  requiredRole: "user",
})
  .then((user): void => {
    createApp(LoginPage).use(i18n).use(plugins, user).mount("#app");
  })
  .catch((e) => e);
