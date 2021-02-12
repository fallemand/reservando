const mockGet = jest.fn();
const mockPut = jest.fn();
const mockPost = jest.fn();
const mockDelete = jest.fn();

jest.mock("koa-router", () =>
  jest.fn(() => ({
    get: mockGet,
    put: mockPut,
    post: mockPost,
    delete: mockDelete,
  })),
);

require("./routes");

describe("Supplier Accounts Routes", () => {
  it("should have REST methods", () => {
    expect(mockGet.mock.calls).toEqual([["/list", expect.any(Function), expect.any(Function)]]);
    expect(mockPost.mock.calls).toEqual([["/create", expect.any(Function), expect.any(Function)]]);
    expect(mockPut.mock.calls).toEqual([["/update", expect.any(Function), expect.any(Function)]]);
    expect(mockDelete.mock.calls).toEqual([
      ["/delete", expect.any(Function), expect.any(Function)],
    ]);
  });
});
