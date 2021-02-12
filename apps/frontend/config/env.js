const env = process.env.NODE_ENV;
const port = process.env.PORT || 3000;
const build = process.env.BUILD;
const datadogTraceHostName = process.env.DATADOG_TRACE_AGENT_HOSTNAME;
const datadogTracePort = process.env.DATADOG_TRACE_AGENT_PORT;
const datadogStatsdHostName = process.env.DATADOG_STATSD_SERVICE_HOST;
const datadogStatsdPort = process.env.DATADOG_STATSD_SERVICE_PORT;

const environment = {
  env,
  isDevelopment: env === "development",
  isTesting: env === "testing",
  isProduction: env === "production",
  port,
  build,
  datadogTrace: {
    host: datadogTraceHostName,
    port: datadogTracePort,
  },
  datadogStatsd: {
    host: datadogStatsdHostName,
    port: datadogStatsdPort,
  },
};

module.exports = environment;
