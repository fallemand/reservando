import HomePageService from "./service";

const mockPost = jest.fn();
const mockGet = jest.fn();

jest.mock("@Utils/rest-client", () => () => ({
  post: mockPost,
  get: mockGet,
}));

describe("Booking Service", () => {
  const homePageService = new HomePageService();

  afterEach(() => {
    mockPost.mockClear();
  });

  it("Gets module data", async () => {
    mockPost.mockResolvedValueOnce({ data: "success" });
    const response = await homePageService.getModulesData();
    expect(mockPost).toHaveBeenCalledWith("/accounts/list");
    expect(response).toEqual("success");
  });
});
