import { Context, Next } from "koa";

export const getSupplierAccounts = async (ctx: Context, next: Next): Promise<void> => {
  ctx.body = "success";
  ctx.status = 200;
  next();
};
