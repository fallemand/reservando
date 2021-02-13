import { Context, Next } from "koa";
import firebaseAdmin from "firebase-admin";
import { Auth } from "@reservando/commons/types";
import credential from "../config/firebase-admin-credential.json";

const UNAUTHORIZED_STATUS = 401;

const getFirebaseUser = async (bearerToken: string): Promise<Auth.UserClaims> => {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(credential as firebaseAdmin.ServiceAccount),
    });
  }

  const jwt = bearerToken.replace("Bearer ", "");
  const decoded = await firebaseAdmin.auth().verifyIdToken(jwt);
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
      role: user.roles,
    };

    if (!user.roles.length || !user.roles.includes(role)) {
      ctx.throw(UNAUTHORIZED_STATUS);
    }

    await next();
  } catch (error) {
    ctx.throw(UNAUTHORIZED_STATUS);
  }
};
