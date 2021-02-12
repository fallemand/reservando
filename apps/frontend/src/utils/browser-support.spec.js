import { webp } from "./browser-support";

describe("webp", () => {
  it("should add Vue Plugins", () => {
    expect(webp()).toEqual(expect.any(Promise));
  });
});
