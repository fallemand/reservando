import "core-js/stable";
import Vue, { VNode } from "vue";
import i18n from "@Utils/i18n";
import initializePage from "@Utils/initialize-page";
import LoginPage from "./LoginPage.vue";

initializePage({
  redirectIfLoggedIn: true,
})
  .then((): void => {
    new Vue({
      i18n,
      render: (h): VNode => h(LoginPage),
    }).$mount("#app");
  })
  .catch((e) => e);
