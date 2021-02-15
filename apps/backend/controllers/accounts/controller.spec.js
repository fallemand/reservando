import { getSupplierAccounts } from "./controller";

describe("Supplier Accounts Controller", () => {
  let ctx = {};
  const next = jest.fn();

  it("Should response 200", async () => {
    ctx.state = {};
    await getSupplierAccounts(ctx, next);
    expect(ctx.status).toEqual(200);
  });
});
