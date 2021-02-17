const serve = require("koa-static");
const Koa = require("koa");
const helmet = require("koa-helmet");
const environment = require("./config/env");
const config = require("./config/config");
const path = require("path");
const Router = require("@koa/router");

const app = new Koa();

if (environment.isProduction) {
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
}

// Start server
app.listen(environment.port, () => {
  /* eslint-disable-next-line no-console */
  console.log(
    `Started: PORT: ${environment.port} | ENV: ${
      environment.env
    } | DATE: ${new Date().toISOString()}`,
  );
  if (environment.isDevelopment && config.useMocks) console.log("Using MOCKS");
  if (process.send) process.send("online");
});

// Serve pages
const router = new Router();
router.get("/signup/(.*)", async (ctx, next) => {
  if (!ctx.request.url.includes(".")) {
    ctx.request.url = "/signup";
  }
  await next();
});
app.use(router.routes()).use(router.allowedMethods());
app.use(serve(path.resolve(__dirname, "./dist")));
