import Vue from "vue";
import SupplierStatusService from "@Services/supplier-status";
import config from "@Config/config";
import { Commit } from "vuex";
import Plugins, { EventLoggerPlugin } from "./vue-plugins";
import { urls } from "@Utils/url-helper";
import { GlobalType } from "@Types/globals";
import browserLogger from "@Utils/loggers/browser-logger";
import rumLogger from "@Utils/loggers/rum-logger";

interface Params {
  permission?: string;
  redirectIfLoggedIn?: boolean;
  store?: {
    dispatch: Commit;
  };
  redirectExceptions?: string[];
}

declare const GLOBAL: GlobalType;

const initializePage = async (params?: Params): Promise<void> => {
  Vue.use(Plugins);

  const loginRequired = params.permission !== undefined;
  const supplierStatusService = new SupplierStatusService();
  const sessionStatus = await supplierStatusService.getSupplierStatus();

  if (loginRequired) {
    SupplierStatusService.validatePermission(params.permission, sessionStatus);
  }

  const shouldRedirect = params.redirectIfLoggedIn && sessionStatus.isLoggedIn;
  const { redirectExceptions = [] } = params;
  const { hash } = window.location;
  const isRedirectException = redirectExceptions.some((exception: string) =>
    hash.includes(exception),
  );

  if (shouldRedirect && !isRedirectException) {
    window.location.assign(urls.home);
    throw "Redirecting";
  }

  if (params.store) {
    params.store.dispatch("supplier/setSupplierStatus", sessionStatus);

    Vue.use(EventLoggerPlugin, {
      ...sessionStatus,
      sent_by: "gyg_new_supplier_portal",
      collectorHost: config.collectorHost,
    });
  }

  if (!GLOBAL.ENV.isDevelopment) {
    browserLogger();
    rumLogger();
  }
};

export default initializePage;
