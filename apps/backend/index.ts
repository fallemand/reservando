import Koa from "koa";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import environment from "./config/env";
import config from "./config/config";
import router from "./router";

const app = new Koa();

if (environment.isProduction) {
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(bodyParser());

  app.use(async (ctx, next) => {
    try {
      await next();
      console.info(
        `[BACKEND] url: ${ctx.request.path} status: ${
          ctx.status
        } timestamp: ${new Date().toISOString()}`,
      );
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message,
      };
    }
  });
}

// Start server
const server = app.listen(environment.port, () => {
  console.log(
    `[BACKEND] Started: PORT: ${environment.port} | ENV: ${
      environment.env
    } | DATE: ${new Date().toISOString()}`,
  );
  if (environment.isDevelopment && config.useMocks) console.log("[BACKEND] Using MOCKS");
  if (process.send) process.send("online");
});

// Create endpoints
app.use(router.routes()).use(router.allowedMethods());
