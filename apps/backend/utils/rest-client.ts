import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import env from "../config/env";

interface Params {
  baseURL?: string;
}

const RestClient = (params: Params = {}): AxiosInstance => {
  const mocksEnabled = env.isDevelopment && config.useMocks;
  const baseURL = mocksEnabled ? "http://localhost:3000/frontend-api/mocks/" : params.baseURL || "";

  return axios.create({
    ...params,
    baseURL,
  });
};

export default RestClient;
