import { AxiosInstance } from "axios";
import RestClient from "@Utils/rest-client";
import camelcaseKeys from "camelcase-keys";

export default class HomePageService {
  restClient: AxiosInstance;

  constructor() {
    this.restClient = RestClient();
  }

  static get URLS(): { [key: string]: string } {
    return {
      HOME_PAGE_MODULES: "/accounts/list",
    };
  }

  async getModulesData(): Promise<string> {
    const response = await this.restClient.post(HomePageService.URLS.HOME_PAGE_MODULES);
    return camelcaseKeys(response.data, { deep: true }) as string;
  }
}
