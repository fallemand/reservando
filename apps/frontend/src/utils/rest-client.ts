import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import config from "@/config/config";
import FirebaseService from "@/services/firebase";
import { GlobalType } from "@/types/globals";

declare const GLOBAL: GlobalType;
const firebaseService = new FirebaseService();

interface Params {
  baseURL?: string;
  statusAllowed?: number[];
  [key: string]: unknown;
}

const RestClient = (params: Params = {}): AxiosInstance => {
  const mocksEnabled = config.useMocks && GLOBAL.ENV.isDevelopment;
  const baseURL = mocksEnabled ? "/mocks" : params.baseURL || "http://localhost:3005/api/";

  const restClient = axios.create({
    ...params,
    baseURL,
  });

  /* eslint-disable no-param-reassign */
  restClient.interceptors.request.use(
    async (request): Promise<AxiosRequestConfig> => {
      const firebaseToken = await firebaseService.getToken();
      if (firebaseToken.length) {
        request.headers["Authorization"] = `Bearer ${firebaseToken}`;
      }
      return request;
    },
    (error): Promise<AxiosError> => Promise.reject(error),
  );

  return restClient;
};

export default RestClient;
