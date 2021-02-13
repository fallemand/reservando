import Koa from "koa";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import environment from "./config/env";
import config from "./config/config";
import router from "./router";
import requestLogger from "./utils/request-logger";

const app = new Koa();

if (environment.isProduction) {
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(bodyParser());
}
app.use(cors());
app.use(requestLogger);

// Start server
app.listen(environment.port, () => {
  console.log(
    `Started: PORT: ${environment.port} | ENV: ${
      environment.env
    } | DATE: ${new Date().toISOString()}`,
  );
  if (environment.isDevelopment && config.useMocks) console.log("Using MOCKS");
  if (process.send) process.send("online");
});

// Create endpoints
app.use(router.routes()).use(router.allowedMethods());
