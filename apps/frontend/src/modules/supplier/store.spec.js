import supplier from "@Modules/supplier/store";
import SupplierStatusService from "@Services/supplier-status";

const mockGetSupplierStatus = jest.fn().mockResolvedValue("userPayload");
jest.mock("@Services/supplier-status", () =>
  jest.fn(() => ({
    getSupplierStatus: mockGetSupplierStatus,
  })),
);
SupplierStatusService.validatePermission = jest.fn();

describe("Supplier store module", () => {
  it("action should commit SET_SUPPLIER_STATUS", async () => {
    const context = {
      commit: jest.fn(),
    };
    const payload = { foo: "bar" };

    await supplier.actions.setSupplierStatus(context, payload);
    expect(context.commit).toHaveBeenCalledWith("SET_SUPPLIER_STATUS", payload);
  });

  it("should update supplier status when mutation is called", () => {
    const state = {
      isLoggedIn: false,
      isStaff: false,
      isOnline: false,
      privileges: [],
    };

    const newState = {
      supplierId: 1234,
      supplierName: "__SUPPLIER-NAME__",
      isStaff: true,
      isLoggedIn: true,
      isOnline: true,
      canAddProducts: true,
      privileges: ["bookings", "financials"],
      hiddenInformationBoxes: {
        "supplier:bookings": ["infoBox1"],
      },
    };

    supplier.mutations.SET_SUPPLIER_STATUS(state, newState);

    expect(state.isLoggedIn).toBe(true);
    expect(state.supplierId).toBe(1234);
    expect(state.supplierName).toBe("__SUPPLIER-NAME__");
    expect(state.privileges.length).toBe(2);
    expect(state.canAddProducts).toBe(true);
    expect(state.isLoggedIn).toBe(true);
    expect(state.isOnline).toBe(true);
    expect(state.hiddenInformationBoxes).toBeDefined();
  });

  it("should have getters defined", () => {
    const state = {
      isLoggedIn: true,
      supplierId: 1234,
      isStaff: true,
      isOnline: true,
      supplierName: "__SUPPLIER-NAME__",
      privileges: ["__PRIVILEGE1__", "__PRIVILEGE2__"],
      hiddenInformationBoxes: {
        "supplier:page": ["test1"],
      },
      containerName: "__CONTAINER__",
      anonymizedIp: "__IP__",
      countryCode: "__COUNTRYCODE__",
      visitorId: "__VISITOR__",
      sessionId: "__SESSION__",
      canAddProducts: false,
    };

    expect(supplier.getters.isBoxVisible(state)("page", "test1")).toBe(false);
    expect(supplier.getters.isBoxVisible(state)("page", "test2")).toBe(true);
    expect(supplier.getters.hasPrivilege({ ...state, isStaff: true })("__PRIVILEGE1__")).toBe(true);
    expect(supplier.getters.hasPrivilege({ ...state, isStaff: true })("__NOT-EXISTS__")).toBe(true);
    expect(supplier.getters.hasPrivilege({ ...state, isStaff: false })("__NOT-EXISTS__")).toBe(
      false,
    );
  });
});
