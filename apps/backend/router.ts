import { Context } from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import env from "./config/env";
import mocks from "./mocks";
import accounts from "./controllers/accounts/routes";

const router = new Router();

// Add controllers routes
router.use(bodyParser());
router.use("/accounts", accounts.routes(), accounts.allowedMethods());

// Add mocks route
if (env.isDevelopment) {
  router.use("/mocks", mocks.routes(), mocks.allowedMethods());
}

// 404 route - keep it at the end
router.all("*", (ctx: Context) => {
  ctx.body = "not found";
  ctx.status = 404;
});

const baseRouter = new Router();
baseRouter.use("/api", router.routes(), router.allowedMethods());
export default baseRouter;
