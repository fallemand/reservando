import "core-js/stable";
import Vue, { VNode } from "vue";
import i18n from "@Utils/i18n";
import initializePage from "@Utils/initialize-page";
import NotFoundPage from "./NotFoundPage.vue";
import store from "./store";

initializePage({
  store,
})
  .then((): void => {
    new Vue({
      i18n,
      store,
      render: (h): VNode => h(NotFoundPage),
    }).$mount("#app");
  })
  .catch((e) => console.log(e));
