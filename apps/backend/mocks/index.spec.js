const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockDelete = jest.fn();
const mockUse = jest.fn();
const mockRoutes = jest.fn();

jest.mock("koa-router", () =>
  jest.fn(() => ({
    get: mockGet,
    post: mockPost,
    put: mockPut,
    delete: mockDelete,
    use: mockUse,
    routes: mockRoutes,
    allowedMethods: jest.fn(),
  })),
);

require("./index");

describe("router", () => {
  it("Should merge other routes", () => {
    expect(mockGet.mock.calls.length).toEqual(2);
    expect(mockPost.mock.calls.length).toEqual(1);
    expect(mockPut.mock.calls.length).toEqual(1);
    expect(mockDelete.mock.calls.length).toEqual(1);
  });
});
