import SupplierStatusService from "./supplier-status";
import Cookie from "@Utils/cookie";

const mockPost = jest.fn();
jest.mock("@Utils/rest-client", () => () => ({
  post: mockPost,
}));

jest.mock("@Utils/cookie");
const statusCookie = Cookie.mock.instances[0];
const csrfTokenCookie = Cookie.mock.instances[1];

describe("Supplier Status service", () => {
  const supplierStatusService = new SupplierStatusService();
  const mockAssign = jest.fn();

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        assign: mockAssign,
      },
    });
  });

  afterEach(() => {
    mockPost.mockClear();
    mockAssign.mockClear();
    csrfTokenCookie.deleteCookie.mockClear();
    statusCookie.deleteCookie.mockClear();
    statusCookie.setCookieVal.mockClear();
  });

  it("gets Supplier status", async () => {
    mockPost.mockResolvedValueOnce({
      data: {
        status: "active",
        privileges: [],
        isLoggedIn: true,
      },
    });
    const status = await supplierStatusService.getSupplierStatus();
    expect(mockPost).toHaveBeenCalledWith("/session_status");
    expect(status.isLoggedIn).toBe(true);
  });

  it("Should replace the url if user not authorized to create products", async () => {
    mockPost.mockResolvedValueOnce({
      data: {
        isLoggedIn: true,
        status: "active",
        privileges: ["financial_management"],
      },
    });

    const { privileges, isStaff } = await supplierStatusService.getSupplierStatus();

    try {
      SupplierStatusService.validatePermission(SupplierStatusService.PERMISSIONS.PRODUCT_MANAGE, {
        privileges,
        isStaff,
      });
    } catch (e) {
      expect(e).toEqual("Redirecting");
    }
    expect(window.location.assign).toHaveBeenCalled();
  });

  it("validatePermission should not do anything if user is Staff", async () => {
    mockPost.mockResolvedValueOnce({
      data: {
        status: "active",
        isStaff: true,
        privileges: [],
      },
    });

    const { privileges, isStaff } = await supplierStatusService.getSupplierStatus();
    SupplierStatusService.validatePermission(SupplierStatusService.PERMISSIONS.PRODUCT_MANAGE, {
      privileges,
      isStaff,
    });
    expect(window.location.assign).not.toHaveBeenCalled();
  });

  it("Should not replace the url if user is authorized to create products", async () => {
    mockPost.mockResolvedValueOnce({
      data: {
        status: "active",
        privileges: ["financial_management", "products_manage"],
      },
    });

    // Verify mock
    expect(jest.isMockFunction(window.location.assign)).toBe(true);

    await supplierStatusService.getSupplierStatus();
    expect(window.location.assign).not.toHaveBeenCalled();
  });

  it("Should not do a post request if cookie has items", async () => {
    await statusCookie.getCookieVal.mockReturnValue('{"test": 1}');

    await supplierStatusService.getSupplierStatus();
    expect(mockPost).not.toHaveBeenCalled();
  });

  it("Should return isLoggedIn: false if response is 403 and not save it in session", async () => {
    mockPost.mockResolvedValue({
      status: 403,
      data: "test",
    });

    await supplierStatusService
      .getSupplierStatus(false)
      .catch((e) => expect(e).toMatch("Redirecting"));

    expect(statusCookie.setCookieVal).not.toHaveBeenCalled();
  });

  it("removeLoginCookie should remove all login cookies", async () => {
    supplierStatusService.removeLoginCookies();
    expect(statusCookie.deleteCookie).toHaveBeenCalledTimes(1);
    expect(csrfTokenCookie.deleteCookie).toHaveBeenCalledTimes(1);
  });

  it("removeSessionCookie should remove only session cookie", async () => {
    supplierStatusService.removeSessionCookie();
    expect(statusCookie.deleteCookie).toHaveBeenCalledTimes(1);
    expect(csrfTokenCookie.deleteCookie).not.toHaveBeenCalled();
  });
});
