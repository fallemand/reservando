import { AxiosInstance, AxiosResponse } from "axios";
import RestClient from "@Utils/rest-client";
import camelcaseKeys from "camelcase-keys";
import { Author, Category, HomeModulesResponse, Media, ModulesQuery, Post, RawPost } from "./types";

export default class HomePageService {
  restClient: AxiosInstance;

  constructor() {
    this.restClient = RestClient();
  }

  static get URLS(): { [key: string]: string } {
    return {
      HOME_PAGE_MODULES: "/account_summary",
    };
  }

  async getModulesData(query: ModulesQuery): Promise<HomeModulesResponse> {
    const response = await this.restClient.post(HomePageService.URLS.HOME_PAGE_MODULES, {
      components: query.modules,
    });

    const { bookings, reviews, supplier } = response.data;
    return camelcaseKeys({ bookings, reviews, supplier }, { deep: true }) as HomeModulesResponse;
  }
}
