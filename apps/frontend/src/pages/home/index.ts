import "core-js/stable";
import Vue, { VNode } from "vue";
import i18n from "@Utils/i18n";
import initializePage from "@Utils/initialize-page";
import SupplierStatusService from "@Services/supplier-status";
import HomePage from "./HomePage.vue";
import store from "./store";

initializePage({
  permission: SupplierStatusService.PERMISSIONS.PORTAL_LOGIN,
  store,
})
  .then((): void => {
    new Vue({
      i18n,
      store,
      render: (h): VNode => h(HomePage),
    }).$mount("#app");
  })
  .catch((e) => e);
