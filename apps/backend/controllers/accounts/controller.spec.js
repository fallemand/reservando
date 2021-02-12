import {
  getSupplierAccounts,
  createSupplierAccount,
  updateSupplierAccount,
  deleteSupplierAccount,
} from "./controller";

jest.mock("../../services/supplier-info");

import SupplierInfo from "../../services/supplier-info";

const supplierInfo = SupplierInfo.mock.instances[0];

describe("Supplier Accounts Controller", () => {
  let ctx;
  const next = jest.fn();

  beforeEach(() => {
    ctx = {
      throw: jest.fn(),
      state: {
        user: {
          type: "supplier",
          id: 666,
        },
      },
      body: {
        supplierId: 66680,
        accountId: 66680,
      },
    };

    next.mockClear();
  });
  it("Should throw an error if no updateUser present", async () => {
    ctx.state = {};
    supplierInfo.supplierRequest.mockResolvedValue({});
    await getSupplierAccounts(ctx, next);

    expect(ctx.throw).toHaveBeenCalledWith(401, "Missing update user");
  });
  it("Has method to getSupplierAccounts", async () => {
    supplierInfo.supplierRequest.mockResolvedValue({});
    await getSupplierAccounts(ctx, next);

    expect(supplierInfo.supplierRequest).toHaveBeenCalledWith({
      method: "get",
      payload: { accountId: 66680, supplierId: 66680 },
      updateUser: { id: 666, type: "supplier" },
    });
  });
  it("Has method to createSupplierAccount", async () => {
    supplierInfo.supplierRequest.mockResolvedValue({});
    await createSupplierAccount(ctx, next);

    expect(supplierInfo.supplierRequest).toHaveBeenCalledWith({
      method: "post",
      payload: { accountId: 66680, supplierId: 66680 },
      updateUser: { id: 666, type: "supplier" },
    });
  });
  it("Has method to updateSupplierAccount", async () => {
    supplierInfo.accountRequest.mockResolvedValue({});
    await updateSupplierAccount(ctx, next);

    expect(supplierInfo.accountRequest).toHaveBeenCalledWith({
      method: "put",
      payload: { accountId: 66680, supplierId: 66680 },
      updateUser: { id: 666, type: "supplier" },
    });
  });
  it("Has method to deleteSupplierAccount", async () => {
    supplierInfo.accountRequest.mockResolvedValue({});
    await deleteSupplierAccount(ctx, next);

    expect(supplierInfo.accountRequest).toHaveBeenCalledWith({
      method: "delete",
      payload: { accountId: 66680, supplierId: 66680 },
      updateUser: { id: 666, type: "supplier" },
    });
  });
});
