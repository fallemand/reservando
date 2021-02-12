const mockAll = jest.fn();
const mockPost = jest.fn();
const mockUse = jest.fn();
const mockRouter = {
  routes: () => () => ({}),
  allowedMethods: () => () => ({}),
};
jest.mock("koa-router", () =>
  jest.fn(() => ({
    all: mockAll,
    post: mockPost,
    use: mockUse,
    ...mockRouter,
  })),
);
jest.mock("./controllers/accounts/routes", () => mockRouter);
jest.mock("./mocks", () => mockRouter);
jest.mock("koa-bodyparser", () => () => "koa-bodyparser");

require("./router");

describe("router", () => {
  it("should have basic routes defined", () => {
    expect(mockUse.mock.calls).toEqual([
      ["koa-bodyparser"],
      ["/accounts", expect.any(Function), expect.any(Function)],
      ["/frontend-api", expect.any(Function), expect.any(Function)],
    ]);
    expect(mockAll.mock.calls).toEqual([["*", expect.any(Function)]]);
  });
});
