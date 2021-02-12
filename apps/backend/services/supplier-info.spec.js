const mockRequest = jest.fn();

jest.mock("../utils/rest-client", () => {
  return jest.fn().mockImplementation(() => ({
    request: mockRequest,
  }));
});

import SupplierInfo from "./supplier-info";
const supplierInfo = new SupplierInfo();

jest.mock("../config/env", () => {
  return {
    env: "production",
  };
});

describe("Service Supplier Info", () => {
  it("Should get the right resource url", async () => {
    const urls = supplierInfo.getResourceURL({
      accountId: 10,
      supplierId: 666,
    });

    expect(urls).toEqual({ ACCOUNT: "accounts/10", SUPPLIER: "suppliers/666/accounts" });
  });
  it("Should handle requests to supplier resource", async () => {
    mockRequest.mockResolvedValue({
      data: [
        {
          email: "test@getyourguide.com",
          first_name: "__FIRST_NAME__",
        },
      ],
    });
    await supplierInfo.supplierRequest({
      method: "get",
      updateUser: {
        id: 888,
        type: "supplier",
      },
      payload: {
        supplierId: 66680,
      },
    });

    expect(supplierInfo.getBaseURL()).toEqual("http://supplier.supplierInfo.svc.cluster.local");
    expect(mockRequest).toHaveBeenCalledWith({
      data: {
        supplierId: 66680,
      },
      headers: { "Gyg-UpdateUser": { id: 888, type: "supplier" } },
      method: "get",
      url: "suppliers/66680/accounts",
    });
  });
  it("Should handle requests to account resource", async () => {
    mockRequest.mockResolvedValue({
      data: [
        {
          email: "test@getyourguide.com",
          first_name: "__FIRST_NAME__",
        },
      ],
    });
    await supplierInfo.accountRequest({
      method: "delete",
      updateUser: {
        id: 888,
        type: "supplier",
      },
      payload: {
        id: 666,
      },
    });

    expect(supplierInfo.getBaseURL()).toEqual("http://supplier.supplierInfo.svc.cluster.local");
    expect(mockRequest).toHaveBeenCalledWith({
      data: {
        id: 666,
      },
      headers: { "Gyg-UpdateUser": { id: 888, type: "supplier" } },
      method: "delete",
      url: "accounts/666",
    });
  });
});
