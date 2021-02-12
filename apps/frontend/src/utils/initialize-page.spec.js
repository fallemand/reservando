import initializePage from "@Utils/initialize-page";
import Vue from "vue";
import Vuex from "vuex";
import SupplierStatusService from "@Services/supplier-status";

Vue.use(Vuex);

const mockGetSupplierStatus = jest.fn().mockResolvedValue("Yup!");

jest.mock("@Services/supplier-status", () =>
  jest.fn(() => ({
    getSupplierStatus: mockGetSupplierStatus,
  })),
);
SupplierStatusService.validatePermission = jest.fn();

jest.mock("vue");
jest.mock("vuex");

const MockSetSupplierStatus = jest.fn();

const store = {
  dispatch: MockSetSupplierStatus,
};

beforeEach(() => {
  SupplierStatusService.validatePermission.mockClear();
});

describe("Initialize Page Utility", () => {
  const mockAssign = jest.fn();

  Object.defineProperty(window, "location", {
    writable: true,
    value: {
      assign: mockAssign,
      hash: "/#/test",
    },
  });

  afterEach(() => {
    mockAssign.mockClear();
  });

  it("should add Vue Plugins", async () => {
    await initializePage({
      store,
      permission: "ALL",
    });

    expect(Vue.use).toHaveBeenCalled();
  });

  it("should get the supplier status", async () => {
    await initializePage({
      store,
      permission: "ALL",
    });

    expect(mockGetSupplierStatus).toHaveBeenCalled();
  });

  it("should validate permissions if needed", async () => {
    await initializePage({
      store,
      permission: "Permission",
    });
    expect(SupplierStatusService.validatePermission).toHaveBeenCalled();
  });

  it("should not validate permissions if no permissions required", async () => {
    await initializePage({
      store,
    });

    expect(SupplierStatusService.validatePermission).not.toHaveBeenCalled();
  });

  it("should set the supplier status in the store", async () => {
    await initializePage({
      store,
      permission: "ALL",
    });

    expect(store.dispatch).toHaveBeenCalledWith("supplier/setSupplierStatus", "Yup!");
  });

  it("redirectIfLoggedIn should redirect to home if logged in", async () => {
    mockGetSupplierStatus.mockResolvedValueOnce({
      isLoggedIn: true,
    });

    await initializePage({
      store,
      redirectIfLoggedIn: true,
    }).catch((e) => expect(e).toMatch("Redirecting"));
    expect(window.location.assign).toHaveBeenCalledWith("/home");
  });

  it("redirectIfLoggedIn should not redirect if logged in but an exception is specified", async () => {
    mockGetSupplierStatus.mockResolvedValueOnce({
      isLoggedIn: true,
    });

    await initializePage({
      store,
      redirectIfLoggedIn: true,
      redirectExceptions: ["#/test"],
    }).catch((e) => expect(e).toMatch("Redirecting"));
    expect(mockAssign).not.toHaveBeenCalled();
  });
});
