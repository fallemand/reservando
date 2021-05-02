import { Context, Next } from "koa";
import firebaseAdmin from "./firebase-admin";
import { Auth } from "@reservando/commons/types";

const UNAUTHORIZED_STATUS = 401;

const getFirebaseUser = async (bearerToken: string): Promise<Auth.UserClaims> => {
  const token = bearerToken.replace("Bearer ", "");
  const decoded = await firebaseAdmin.auth().verifyIdToken(token);
  const { uid } = decoded;
  const userData = await firebaseAdmin.auth().getUser(uid);
  return userData.customClaims as Auth.UserClaims;
};

export default (role: Auth.Role) => async (ctx: Context, next: Next): Promise<void> => {
  try {
    const bearerToken = ctx.get("Authorization");

    if (!bearerToken) {
      ctx.throw(UNAUTHORIZED_STATUS);
    }

    const user = await getFirebaseUser(bearerToken);

    ctx.state.user = {
      roles: user.roles,
    };

    if (!user.roles.length || !user.roles.includes(role)) {
      ctx.throw(UNAUTHORIZED_STATUS);
    }

    await next();
  } catch (error) {
    ctx.throw(UNAUTHORIZED_STATUS);
  }
};
