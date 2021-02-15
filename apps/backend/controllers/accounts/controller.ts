import { Context } from "koa";

export const getSupplierAccounts = async (ctx: Context): Promise<void> => {
  ctx.body = "success";
  ctx.status = 200;
};
