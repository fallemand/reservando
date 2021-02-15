import "core-js/stable";
import { createApp } from "vue";
import initializePage from "@Utils/initialize-page";
import i18n from "@Utils/i18n";
import HomePage from "./HomePage.vue";
import store from "./store";
import plugins from "@Utils/vue-plugins";

initializePage({
  requiredRole: "user",
})
  .then((user): void => {
    createApp(HomePage).use(i18n).use(store).use(plugins, user).mount("#app");
  })
  .catch((e) => e);
