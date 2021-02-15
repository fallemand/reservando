import { Context } from "koa";
import Router from "@koa/router";
import accounts from "./controllers/accounts/routes";

const router = new Router();

// Add controllers routes
router.use("/accounts", accounts.routes(), accounts.allowedMethods());

// // Add mocks route
// if (env.isDevelopment) {
//   router.use("/mocks", mocks.routes(), mocks.allowedMethods());
// }

const baseRouter = new Router();
baseRouter.use("/api", router.routes(), router.allowedMethods());

// 404 route - keep it at the end
baseRouter.all("(.*)", (ctx: Context) => {
  ctx.body = "not found";
  ctx.status = 404;
});

export default baseRouter;
