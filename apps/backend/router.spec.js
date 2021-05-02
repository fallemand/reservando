const mockAll = jest.fn();
const mockPost = jest.fn();
const mockUse = jest.fn();
const mockRouter = {
  routes: () => () => ({}),
  allowedMethods: () => () => ({}),
};
jest.mock("@koa/router", () =>
  jest.fn(() => ({
    all: mockAll,
    post: mockPost,
    use: mockUse,
    ...mockRouter,
  })),
);
jest.mock("./mocks", () => mockRouter);

require("./router");

describe("router", () => {
  it("should have basic routes defined", () => {
    expect(mockPost.mock.calls).toEqual([
      ["/users/list", expect.any(Function), expect.any(Function)],
    ]);
    expect(mockAll.mock.calls).toEqual([["(.*)", expect.any(Function)]]);
  });
});
