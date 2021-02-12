import { actions } from "@Pages/home/store";
import HomePageService from "@Pages/home/service";

jest.mock("@Pages/home/service");

describe("HomePage state store", () => {
  it("has action loadDefaultState which should call the load the default state", async () => {
    const context = {
      rootGetters: {
        ["supplier/hasPrivilege"]: jest.fn(),
      },
      commit: jest.fn(),
      dispatch: jest.fn(),
      summary: {
        hasActiveProducts: true,
        hasReviews: true,
        hasBookings: true,
        hasProducts: true,
      },
    };
    await actions.loadDefaultState(context);

    expect(context.dispatch.mock.calls).toEqual([]);
  });
});
