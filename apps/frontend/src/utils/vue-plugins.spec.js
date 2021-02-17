import plugins from "./vue-plugins";
jest.mock("@/utils/sanitize-html", () => "__SANITIZE__");
jest.mock("@/utils/urls", () => "__URLS__");

describe("Vue plugins", () => {
  it("should set up plugins", async () => {
    const appMock = {
      config: {
        globalProperties: {},
      },
    };

    await plugins.install(appMock);
    expect(appMock.config.globalProperties.$sanitizeHTML).toEqual("__SANITIZE__");
    expect(appMock.config.globalProperties.$urls).toEqual("__URLS__");
  });
});
