describe("environmental variables", () => {
  const ENV = {
    BUILD: "false",
    NODE_ENV: "production",
    FIREBASE_PROJECT_ID: "__PROJECT_ID__",
    FIREBASE_DATABASE_URL: "__DATABASE_URL__",
    GOOGLE_APPLICATION_CREDENTIALS: '{"__KEY__": "__VALUE__"}',
  };

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ENV };
  });

  test("should generate map of values", () => {
    // eslint-disable-next-line global-require
    const env = require("./env");
    expect(env).toMatchSnapshot();
  });
});
