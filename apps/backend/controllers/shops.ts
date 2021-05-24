import { Context } from "koa";
import { Shops, Auth } from "@reservando/commons/types";
import { db } from "../services/firebase-admin";
import ValidationError from "../utils/validation-error";
import { validate } from "jsonschema";
import schema from "@reservando/commons/schema.json";

export const create = async (ctx: Context): Promise<void> => {
  try {
    const {
      name,
      userId,
      calendars,
      sectors,
      notifications,
      duration,
      interval,
    } = ctx.request.body;

    const result = validate(ctx.request.body, schema);
    if (!result.valid) {
      throw new ValidationError(result.errors.toString());
    }

    // Define user id
    const user: Auth.User = ctx.state.user;
    const shopUserId = user.role === "admin" ? userId : user.id;

    // Create document
    const docRef = db.collection("shops").doc();
    const shop: Shops.Shop = {
      id: docRef.id,
      name,
      duration,
      interval,
      sectors,
      userId: shopUserId,
      calendars,
      notifications,
    };
    docRef.set(shop);

    // Response
    ctx.status = 200;
    ctx.body = docRef.id;
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.status = error.status;
      ctx.body = error.message;
    } else {
      console.error("Error creating document: ", error);
      ctx.status = 500;
      ctx.body = error.message;
    }
  }
};

export const list = async (ctx: Context): Promise<void> => {
  try {
    const user: Auth.User = ctx.state.user;
    const documents = await db.collection("shops").where("userId", "==", user.id).get();
    const shops: Shops.Shop[] = [];
    documents.forEach((doc) => shops.push(doc.data() as Shops.Shop));

    // Response
    ctx.status = 200;
    ctx.body = shops;
  } catch (error) {
    console.error("Error listing user documents: ", error);
  }
};

export default {
  create,
  list,
};
