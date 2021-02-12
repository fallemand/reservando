import RestClient from "../utils/rest-client";
import { AxiosInstance } from "axios";
import secrets from "../config/env";
import { AxiosResponse } from "axios";

export type REST_METHOD = "post" | "get" | "put" | "delete";

interface UpdateUser {
  id: number;
  type: "supplier" | "staff";
}

type NotificationRole =
  | "customer_question"
  | "reviews"
  | "product_quality"
  | "accounting"
  | "bookings";
type LoginRole = "admin";

type Status = "unconfirmed" | "confirmed";

export interface SupplierAccountPayload {
  payload: SupplierAccount;
  method: REST_METHOD;
  updateUser: UpdateUser;
}

export interface SupplierAccount {
  supplierId?: number;
  id: number;
  salutation_id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: Status;
  has_firebase_password: boolean;
  allow_login: boolean;
  allow_notification: boolean;
  is_primary: boolean;
  role: LoginRole;
  notification_roles: NotificationRole[];
}

export type SupplierAccountResponse = SupplierAccount[] | AxiosResponse;


export default class SupplierInfo {
  restClient: AxiosInstance;

  constructor() {
    this.restClient = RestClient({
      baseURL: this.getBaseURL(),
    });
  }

  getResourceURL(params: { supplierId?: number; accountId?: number }): Record<string, string> {
    return {
      SUPPLIER: `suppliers/${params.supplierId}/accounts`,
      ACCOUNT: `accounts/${params.accountId}`,
    };
  }

  getBaseURL(): string {
    // TODO: update these
    const baseURLS = {
      development: "http://supplierInfo:80/",
      testing: "http://supplier.supplierInfo/",
      production: "http://supplier.supplierInfo.svc.cluster.local",
    };

    return baseURLS[secrets.env];
  }

  async supplierRequest(params: SupplierAccountPayload): Promise<SupplierAccountResponse> {
    const { method, payload, updateUser } = params;
    const response = await this.restClient.request({
      method,
      url: this.getResourceURL({ supplierId: payload.supplierId }).SUPPLIER,
      headers: {
        "Gyg-UpdateUser": updateUser,
      },
      data: payload,
    });

    return response.data;
  }

  async accountRequest(params: SupplierAccountPayload): Promise<SupplierAccountResponse> {
    const { method, payload, updateUser } = params;
    const response = await this.restClient.request({
      method,
      url: this.getResourceURL({ accountId: payload.id }).ACCOUNT,
      headers: {
        "Gyg-UpdateUser": updateUser,
      },
      data: payload,
    });

    return response.data;
  }
}
