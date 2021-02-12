import SupplierInfo from "../../services/supplier-info";
import { Context, Next } from "koa";

const supplierInfo = new SupplierInfo();

export const getSupplierAccounts = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const { user } = ctx.state;
    const payload = ctx.body;

    if (!user) {
      ctx.throw(401, "Missing update user");
    }

    ctx.body = await supplierInfo.supplierRequest({
      method: "get",
      updateUser: user,
      payload,
    });
    await next();
  } catch (error) {
    // TODO handle error here - Maybe create util
    console.log(error);
  }
};

export const createSupplierAccount = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const { user } = ctx.state;
    const payload = ctx.body;

    if (!user) {
      ctx.throw(401, "Missing update user");
    }

    ctx.body = await supplierInfo.supplierRequest({
      method: "post",
      updateUser: user,
      payload,
    });
    await next();
  } catch (error) {
    // TODO handle error here - Maybe create util
    console.log(error);
  }
};

export const updateSupplierAccount = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const { user } = ctx.state;
    const payload = ctx.body;

    if (!user) {
      ctx.throw(401, "Missing update user");
    }

    ctx.body = await supplierInfo.accountRequest({
      method: "put",
      updateUser: user,
      payload,
    });
    await next();
  } catch (error) {
    // TODO handle error here - Maybe create util
    console.log(error);
  }
};

export const deleteSupplierAccount = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const { user } = ctx.state;
    const payload = ctx.body;

    if (!user) {
      ctx.throw(401, "Missing update user");
    }

    ctx.body = await supplierInfo.accountRequest({
      method: "delete",
      updateUser: user,
      payload,
    });
    await next();
  } catch (error) {
    // TODO handle error here - Maybe create util
    console.log(error);
  }
};
