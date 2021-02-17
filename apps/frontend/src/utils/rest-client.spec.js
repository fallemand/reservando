import RestClient from "@/utils/rest-client";
import axios from "axios";

jest.mock("@/services/firebase", () =>
  jest.fn(() => ({
    getToken: () => 1234,
  })),
);
jest.spyOn(axios, "create");

const assign = jest.fn();
Object.defineProperty(window, "location", {
  writable: true,
  value: {
    assign,
  },
});
jest.mock("@/config/config", () => ({
  useMocks: true,
  urls: {},
}));

const restClient = RestClient();

describe("Rest Client", () => {
  afterEach(() => {
    axios.create.mockClear();
  });

  // Also to verify it's an instance of axios
  // https://github.com/axios/axios/issues/737
  it("Should have a post and get methods", () => {
    expect(typeof restClient.post).toBe("function");
    expect(typeof restClient.get).toBe("function");
  });

  it("Should have a baseURL of api", () => {
    expect(restClient.defaults.baseURL).toBe("http://localhost:3005/api/");
  });

  it("Should override default params", () => {
    const restClientWithOverride = RestClient({
      timeout: 5,
    });

    expect(restClientWithOverride.defaults.timeout).toBe(5);
  });

  it("should not add mocks if not development", () => {
    global.GLOBAL.ENV.isDevelopment = false;
    RestClient();
    expect(axios.create).toHaveBeenCalledWith({ baseURL: "http://localhost:3005/api/" });
  });

  it("should add mocks if development & enabled", () => {
    global.GLOBAL.ENV.isDevelopment = true;
    RestClient();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "/mocks",
    });
  });
});
