import MockRestClient from "./mock-rest-client";

const restClient = {
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
};

describe("MockRestClient", () => {
  const mockRestClient = new MockRestClient(restClient);

  afterEach(() => {
    mockRestClient.reset();
  });

  it("should add interceptors to restclient", () => {
    expect(restClient.interceptors.request.use).toHaveBeenCalled();
    expect(restClient.interceptors.request.use).toHaveBeenCalled();
  });

  it("should add mocks", () => {
    const response = {
      status: 200,
      data: {},
    };
    mockRestClient.addMock("__TEST-URL__", response);

    expect(mockRestClient.getMocks()["__TEST-URL__"]).toEqual(response);
    expect(mockRestClient.isUrlMocked("__TEST-URL__")).toBeTruthy();
  });

  it("throw error in case mock response is !== 200", async () => {
    const mockResponse = {
      status: 400,
      data: {},
    };
    try {
      await mockRestClient.mockResponse({ mockData: mockResponse });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data).toEqual({});
    }
  });

  it("response mock data in case 200", async () => {
    const mockResponse = {
      status: 200,
      data: {},
    };
    const response = await mockRestClient.mockResponse({
      mockData: mockResponse,
    });
    expect(response).toEqual(mockResponse);
  });

  it("should reset mocks", () => {
    mockRestClient.addMock("__TEST-URL__", {});
    mockRestClient.reset();

    expect(mockRestClient.getMocks()["__TEST-URL__"]).toBeUndefined();
  });
});
