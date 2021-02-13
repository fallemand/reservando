import "core-js/stable";
import Vue, { VNode } from "vue";
import i18n from "@Utils/i18n";
import initializePage from "@Utils/initialize-page";
import HomePage from "./HomePage.vue";
import store from "./store";

initializePage({
  requiredRole: "user",
})
  .then((): void => {
    new Vue({
      i18n,
      store,
      render: (h): VNode => h(HomePage),
    }).$mount("#app");
  })
  .catch((e) => e);
