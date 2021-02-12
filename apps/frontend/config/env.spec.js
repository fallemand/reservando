describe("environmental variables", () => {
  const ENV = {
    BUILD: "false",
    NODE_ENV: "production",
    DATADOG_TRACE_AGENT_HOSTNAME: "DATAGOD-HOSTNAME",
    DATADOG_TRACE_AGENT_PORT: "DATAGOD-PORT",
    DATADOG_STATSD_SERVICE_HOST: "DATAGOD-STATS-HOST",
    DATADOG_STATSD_SERVICE_PORT: "DATAGOD-STATS-POST",
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
