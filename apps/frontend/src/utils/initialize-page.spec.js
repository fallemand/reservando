import initializePage from "./initialize-page";

const mockGetUser = jest.fn();

jest.mock("@Services/firebase", () =>
  jest.fn(() => ({
    getUser: mockGetUser,
  })),
);
jest.mock("vue");

describe("Initialize Page Utility", () => {
  const mockAssign = jest.fn();

  Object.defineProperty(window, "location", {
    writable: true,
    value: {
      assign: mockAssign,
      hash: "/#/test",
    },
  });

  it("should redirect if users exists", async () => {
    mockGetUser.mockResolvedValueOnce("user");
    await expect(
      initializePage({
        redirectIfLoggedIn: true,
      }),
    ).rejects.toEqual("Redirecting | logged user");
  });

  it("should redirect if no user and role required", async () => {
    mockGetUser.mockResolvedValueOnce();
    await expect(
      initializePage({
        requiredRole: "admin",
      }),
    ).rejects.toEqual("Redirecting | missing role");
  });
});
