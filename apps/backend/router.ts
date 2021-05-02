import { Context } from "koa";
import Router from "@koa/router";
import users from "./controllers/users";
import auth from "./services/auth";

const router = new Router({
  prefix: "/api",
});

// Add controllers routes
router.post("/users/create", auth("admin"), users.create);

// // Add mocks route
// if (env.isDevelopment) {
//   router.use("/mocks", mocks.routes(), mocks.allowedMethods());
// }

// 404 route - keep it at the end
router.all("(.*)", (ctx: Context) => {
  ctx.body = "not found";
  ctx.status = 404;
});

export default router;
