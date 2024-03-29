import "core-js/stable";
import { createApp } from "vue";
import initializePage from "@/utils/initialize-page";
import i18n from "@/utils/i18n";
import plugins from "@/utils/vue-plugins";
import SignupPage from "./SignupPage.vue";
import router from "./router";
import { store, key } from "./store";

initializePage().then((user) => {
  createApp(SignupPage).use(router).use(i18n).use(store, key).use(plugins, user).mount("#app");
});
