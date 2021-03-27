import plugins from "./vue-plugins";
jest.mock("@/utils/sanitize-html", () => "__SANITIZE__");
jest.mock("@/utils/urls", () => "__URLS__");
jest.mock("@reservando/design-system/components/Icon/icons", () => "__ICONS__");

describe("Vue plugins", () => {
  it("should set up plugins", async () => {
    const appMock = {
      config: {
        globalProperties: {},
      },
      component: jest.fn(),
    };

    await plugins.install(appMock);
    expect(appMock.config.globalProperties.$sanitizeHTML).toEqual("__SANITIZE__");
    expect(appMock.config.globalProperties.$urls).toEqual("__URLS__");
    expect(appMock.config.globalProperties.$icons).toEqual("__ICONS__");
  });
});
