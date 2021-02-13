import urls from "@Utils/urls";
import RestClient from "@Utils/rest-client";
import { AxiosInstance } from "axios";
import { SupplierStatusState } from "@Modules/supplier/store";
import Cookie from "@Utils/cookie";

const STORAGE_KEY = "supplierStatus";
const supplierStatusCookie = new Cookie(STORAGE_KEY);

const X_CSRF_TOKEN = "x-csrf-token";
const csrfTokenCookie = new Cookie(X_CSRF_TOKEN);

class SupplierStatus {
  restClient: AxiosInstance;

  constructor() {
    this.restClient = RestClient();
  }

  static get URLS(): { [key: string]: string } {
    return {
      SUPPLIER_STATUS: "/session_status",
    };
  }

  static get PERMISSIONS(): { [key: string]: string } {
    return {
      FINANCIALS_MANAGE: "financials_manage",
      PRODUCT_MANAGE: "products_manage",
      INVENTORY_MANAGE: "inventory_manage",
      BOOKINGS_MANAGE: "bookings_manage",
      PORTAL_LOGIN: "portal_login",
      USER_MANAGEMENT: "user_management",
    };
  }

  static validatePermission(permission: string, privileges: string[]): void {
    if (!privileges.includes(permission)) {
      window.location.assign(urls.home);
      throw "Redirecting";
    }
  }

  async getSupplierStatus(): Promise<SupplierStatusState> {
    let status;

    if (supplierStatusCookie.getCookieVal()) {
      status = supplierStatusCookie.getCookieVal();
      return JSON.parse(status);
    }

    const response = await this.restClient.post(SupplierStatus.URLS.SUPPLIER_STATUS);
    status = response.data;

    if (status.isLoggedIn) {
      supplierStatusCookie.setCookieVal(JSON.stringify(status));
    }

    return status;
  }

  removeLoginCookies(): void {
    supplierStatusCookie.deleteCookie();
    csrfTokenCookie.deleteCookie();
  }

  removeSessionCookie(): void {
    supplierStatusCookie.deleteCookie();
  }
}

export default SupplierStatus;
