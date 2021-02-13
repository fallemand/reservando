import axios, { AxiosInstance } from "axios";
import config from "@Config/config";
import { GlobalType } from "@Types/globals";

declare const GLOBAL: GlobalType;

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

  return restClient;
};

export default RestClient;
