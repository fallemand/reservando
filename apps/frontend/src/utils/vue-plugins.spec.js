import plugins from "./vue-plugins";
jest.mock("@Utils/sanitize-html", () => "__SANITIZE__");
jest.mock("@Utils/urls", () => "__URLS__");

describe("Vue plugins", () => {
  it("should set up plugins", async () => {
    const VueMock = {
      prototype: {},
      use: jest.fn(),
    };

    await plugins.install(VueMock);
    expect(VueMock.prototype.$sanitizeHTML).toEqual(expect.any(Function));
    expect(VueMock.prototype.$urls).toEqual("__URLS__");
  });
});
