import plugins from "./vue-plugins";
jest.mock("vue-line-clamp", () => "__VUE-LINE-CLAMP__");
jest.mock("@Utils/sanitize-html", () => "__SANITIZE__");
jest.mock("@Components/Icons", () => ({ icons: "__ICONS__" }));
jest.mock("@Utils/url-helper", () => ({ urls: "__URLS__" }));
jest.mock("@Utils/browser-support", () => ({ webp: () => true }));

describe("Vue plugins", () => {
  it("should set up plugins", async () => {
    const VueMock = {
      prototype: {},
      use: jest.fn(),
    };

    await plugins.install(VueMock);
    expect(VueMock.use).toHaveBeenCalledWith("__VUE-LINE-CLAMP__");
    expect(VueMock.prototype.$sanitizeHTML).toEqual(expect.any(Function));
    expect(VueMock.prototype.$urls).toEqual("__URLS__");
    expect(VueMock.prototype.$browser.webp).toEqual(true);
    expect(VueMock.prototype.$browser.ie11).toEqual(false);
  });
});
