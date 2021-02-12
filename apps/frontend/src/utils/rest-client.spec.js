import RestClient from "@Utils/rest-client";
import MockRestClient from "@Services/mock-rest-client";
import Cookie from "@Utils/cookie";
import axios from "axios";

jest.mock("@Utils/cookie");
jest.mock("@Services/firebase");

jest.spyOn(axios, "create");

const assign = jest.fn();
Object.defineProperty(window, "location", {
  writable: true,
  value: {
    assign,
  },
});
jest.mock("@Config/config", () => ({
  useMocks: true,
  urls: {},
  getSentryDSN: () => "",
}));

const restClient = RestClient();
const mockRestClient = new MockRestClient(restClient);

describe("Rest Client", () => {
  afterEach(() => {
    mockRestClient.reset();
    axios.create.mockClear();
  });

  // Also to verify it's an instance of axios
  // https://github.com/axios/axios/issues/737
  it("Should have a post and get methods", () => {
    expect(typeof restClient.post).toBe("function");
    expect(typeof restClient.get).toBe("function");
  });

  it("Should have a baseURL of api", () => {
    expect(restClient.defaults.baseURL).toBe("/api/");
  });

  it("Should override default params", () => {
    const restClientWithOverride = RestClient({
      timeout: 5,
    });

    expect(restClientWithOverride.defaults.timeout).toBe(5);
  });

  it("Should return response when successful", async () => {
    mockRestClient.addMock("/api_v2/supplier_status", {
      status: 200,
      headers: {},
      data: "hello",
    });

    const response = await restClient.post("/api_v2/supplier_status");
    expect(response.data).toBe("hello");
  });

  it("Should return error with correct status", async () => {
    mockRestClient.addMock("/api_v2/supplier_status", {
      status: 500,
      data: "hello",
    });

    try {
      await restClient.post("/api_v2/supplier_status");
    } catch (error) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(500);
      expect(error.response.data).toBe("hello");
    }
  });

  it("Should save x-csrf-token to cookie", async () => {
    mockRestClient.addMock("/api_v2/supplier_status", {
      status: 200,
      headers: {
        "x-csrf-token": "1234",
      },
    });

    const cookie = Cookie.mock.instances[2];
    const mockSetCookieVal = cookie.setCookieVal;

    await restClient.post("/api_v2/supplier_status");
    expect(mockSetCookieVal).toHaveBeenCalledWith("1234");
  });

  it("should not add mocks if not development", () => {
    global.GLOBAL.ENV.isDevelopment = false;
    RestClient();
    expect(axios.create).toHaveBeenCalledWith({ baseURL: "/api/" });
  });

  it("should add mocks if development & enabled", () => {
    global.GLOBAL.ENV.isDevelopment = true;
    RestClient();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "/mocks",
    });
  });
});
