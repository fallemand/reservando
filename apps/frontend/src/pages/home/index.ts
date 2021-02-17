import "core-js/stable";
import { createApp } from "vue";
import initializePage from "@/utils/initialize-page";
import i18n from "@/utils/i18n";
import HomePage from "./HomePage.vue";
import store from "./store";
import plugins from "@/utils/vue-plugins";

initializePage({
  requiredRole: "user",
})
  .then((user): void => {
    createApp(HomePage).use(i18n).use(store).use(plugins, user).mount("#app");
  })
  .catch((e) => e);
