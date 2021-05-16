import { Context, Next } from "koa";
import firebaseAdmin from "./firebase-admin";
import { Auth } from "@reservando/commons/types";

const UNAUTHORIZED_STATUS = 401;

const getUser = async (bearerToken: string): Promise<Auth.User> => {
  const token = bearerToken.replace("Bearer ", "");
  const decoded = await firebaseAdmin.auth().verifyIdToken(token);
  const { uid } = decoded;
  const firebaseUser = await firebaseAdmin.auth().getUser(uid);

  // Set default role
  if (!firebaseUser.customClaims?.role) {
    firebaseAdmin.auth().setCustomUserClaims(firebaseUser.uid, {
      role: "user",
    });
  }

  // Return user
  const user: Auth.User = {
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    emailVerified: firebaseUser.emailVerified,
    displayName: firebaseUser.displayName || "",
    role: firebaseUser.customClaims?.role,
  };
  console.log(user);
  return user;
};

export default (role: Auth.Role) => async (ctx: Context, next: Next): Promise<void> => {
  try {
    const bearerToken = ctx.get("Authorization");

    if (!bearerToken) {
      ctx.throw(UNAUTHORIZED_STATUS);
    }

    const user = await getUser(bearerToken);
    ctx.state.user = user;

    if (!user.role || (user.role !== "admin" && user.role !== role)) {
      ctx.throw(UNAUTHORIZED_STATUS);
    }

    await next();
  } catch (error) {
    ctx.throw(UNAUTHORIZED_STATUS);
  }
};
