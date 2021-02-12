import requestLogger from "./request-logger";

describe("RequestLogger Middleware", () => {
  it("Should log each request", async () => {
    global.console.info = jest.fn();
    Date.prototype.toISOString = () => "2020-12-10 22:00";
    const ctx = { status: 200, request: { path: "test.com/path" } };
    const next = jest.fn();
    await requestLogger(ctx, next);
    expect(global.console.info).toHaveBeenCalledWith(
      "[BACKEND] url: test.com/path status: 200 timestamp: 2020-12-10 22:00",
    );
  });
});
