import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "@Config/config";
import FirebaseService from "@Services/firebase";

const firebaseService = new FirebaseService();

interface Params {
  baseURL?: string;
  statusAllowed?: number[];
  [key: string]: unknown;
}

const RestClient = (params: Params = {}): AxiosInstance => {
  const mocksEnabled = config.useMocks;
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

  restClient.interceptors.response.use(
    (response): AxiosResponse => response,
    async (error): Promise<AxiosError> => {
      const { status } = error.response;
      console.log(`ERROR: ${status}`);
      return Promise.reject(error);
    },
  );

  return restClient;
};

export default RestClient;
