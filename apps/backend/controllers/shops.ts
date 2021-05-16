import { Context } from "koa";
import { Shops, Auth } from "@reservando/commons/types";
import { db } from "../services/firebase-admin";

export const create = async (ctx: Context): Promise<void> => {
  try {
    const { name, userId, calendars, sectors, notifications } = ctx.request.body;

    // Define user id
    const user: Auth.User = ctx.state.user;
    const shopUserId = user.role === "admin" ? userId : user.id;

    // Create document
    const docRef = db.collection("shops").doc();
    const shop: Shops.Shop = {
      id: docRef.id,
      name,
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
    console.error("Error creating document: ", error);
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
