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
      CREATE: "/shops/create",
    };
  }

  async create(shop: Shops.Shop): Promise<void> {
    const response = await this.restClient.post(ReviewsService.URLS.CREATE, shop);
    return response.data;
  }
}
