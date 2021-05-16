import { AxiosInstance } from "axios";
import RestClient from "@/utils/rest-client";
import { Shops } from "@reservando/commons/types";

export default class ReviewsService {
  restClient: AxiosInstance;

  constructor() {
    this.restClient = RestClient();
  }

  static get URLS(): { [key: string]: string } {
    return {
      LIST_SHOPS: "/shops/list",
    };
  }

  async listShops(): Promise<Shops.Shop[]> {
    const response = await this.restClient.post(ReviewsService.URLS.LIST_SHOPS);
    return response.data;
  }
}
