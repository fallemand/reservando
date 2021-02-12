import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "@Config/config";
import { urls } from "@Utils/url-helper";
import Cookie from "@Utils/cookie";
import { GlobalType } from "@Types/globals";
import SupplierStatus from "@Services/supplier-status";
import Firebase from "@Services/firebase";

declare const GLOBAL: GlobalType;
const X_CSRF_TOKEN = "x-csrf-token";
const csrfTokenCookie = new Cookie(X_CSRF_TOKEN);
const firebase = new Firebase();

interface Params {
  baseURL?: string;
  statusAllowed?: number[];
  [key: string]: unknown;
}

const RestClient = (params: Params = {}): AxiosInstance => {
  const mocksEnabled = GLOBAL.ENV.isDevelopment && config.useMocks;
  const baseURL = mocksEnabled ? "/mocks" : params.baseURL || "/api/";

  const restClient = axios.create({
    ...params,
    baseURL,
  });

  /* eslint-disable no-param-reassign */
  restClient.interceptors.request.use(
    async (request): Promise<AxiosRequestConfig> => {
      const firebaseToken = await firebase.getTokenId();

      if (!!firebaseToken.length && baseURL === "/api/") {
        request.headers["Authorization"] = `Bearer ${firebaseToken}`;
        request.baseURL = "/api_v2/";
      }

      request.headers[X_CSRF_TOKEN] = csrfTokenCookie.getCookieVal();

      return request;
    },
    (error): Promise<AxiosError> => Promise.reject(error),
  );

  restClient.interceptors.response.use(
    (response): AxiosResponse => {
      if (response.headers && response.headers[X_CSRF_TOKEN]) {
        csrfTokenCookie.setCookieVal(response.headers[X_CSRF_TOKEN]);
      }

      return response;
    },
    async (error): Promise<AxiosError> => {
      const { status } = error.response;
      const isLoggedOut = status === 403;
      const csrfInvalid = status === 400;

      // 400 if CSRF Token is invalid, 401 if user lacks permissions, 403 if they are not logged in, 404 if API is dead
      const redirectStatuses = [400, 401, 403, 404];
      // const serverErrorStatuses = [500, 502, 503];
      const avoidRedirection = params.statusAllowed && params.statusAllowed.includes(status);

      if (redirectStatuses.includes(status) && !avoidRedirection) {
        if (isLoggedOut || csrfInvalid) {
          const supplierStatusService = new SupplierStatus();

          supplierStatusService.removeLoginCookies();
          await firebase.deleteSession();
        }

        window.location.assign(urls.loginRedirect(window.location.href));
      }

      // if (serverErrorStatuses.includes(status)) {
      //   datadogMetric.logMetric({
      //     metricName: "supplier_api_returning_non_200",
      //     values: {
      //       status,
      //     },
      //   });
      // }

      return Promise.reject(error);
    },
  );

  return restClient;
};

export default RestClient;
