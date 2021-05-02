import { Context } from "koa";
import { db } from "../services/firebase-admin";

export const create = async (ctx: Context): Promise<void> => {
  try {
    const docRef = await db.collection("users").add({
      name: ctx.request.body.name,
    });
    ctx.status = 200;
    ctx.body = docRef.id;
  } catch (error) {
    console.error("Error creating document: ", error);
  }
};

export default {
  create,
};
