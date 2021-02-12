import RestClient from "./rest-client";
import axios from "axios";

jest.mock("../config/config", () => ({
  useMocks: true,
}));
jest.mock("../config/env", () => ({
  isDevelopment: true,
}));

jest.spyOn(axios, "create");

const restClient = RestClient();

describe("Rest Client", () => {
  afterEach(() => {
    axios.create.mockClear();
  });

  it("Should have a post and get methods", () => {
    expect(typeof restClient.post).toBe("function");
    expect(typeof restClient.get).toBe("function");
  });

  it("should add mocks if development & enabled", () => {
    RestClient();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "http://localhost:3000/frontend-api/mocks/",
    });
  });
});
