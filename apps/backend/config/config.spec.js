import config from "./config";
import env from "./env";

describe("Config", () => {
  it("Should not have useMocks set to true if building for production", () => {
    const { isTesting } = env;

    if (isTesting) {
      expect(config.useMocks).toBe(false);
    }
  });
});
