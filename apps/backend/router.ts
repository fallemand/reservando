import { Context } from "koa";
import Router from "@koa/router";
import shops from "./controllers/shops";
import auth from "./services/auth";

const router = new Router({
  prefix: "/api",
});

// Add controllers routes
router.post("/shops/create", auth("user"), shops.create);
router.post("/shops/list", auth("user"), shops.list);

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
