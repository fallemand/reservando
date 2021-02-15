const mockPost = jest.fn();

jest.mock("@koa/router", () =>
  jest.fn(() => ({
    post: mockPost,
  })),
);

require("./routes");

describe("Supplier Accounts Routes", () => {
  it("should have REST methods", () => {
    expect(mockPost.mock.calls).toEqual([["/list", expect.any(Function), expect.any(Function)]]);
  });
});
