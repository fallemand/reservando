import "core-js/stable";
import { createApp } from "vue";
import initializePage from "@/utils/initialize-page";
import i18n from "@/utils/i18n";
import plugins from "@/utils/vue-plugins";
import HomePage from "./HomePage.vue";
import { store, key } from "./store";

initializePage({ requiredRole: "user" }).then((user) => {
  createApp(HomePage).use(i18n).use(store, key).use(plugins, user).mount("#app");
});
