import config from "./config";

describe("Config", () => {
  it("Should not have useMocks set to true if building for production", () => {
    const { isProduction } = global.GLOBAL.ENV;

    if (isProduction) {
      expect(config.useMocks).toBe(false);
    }
  });
});
