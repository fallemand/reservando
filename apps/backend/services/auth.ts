import { Context, Next } from "koa";
import firebaseAdmin from "firebase-admin";

export type Permission =
  | "portal_login"
  | "bookings_manage"
  | "bookings_export"
  | "inventory_manage"
  | "products_manage"
  | "reviews_manage"
  | "deals_manage"
  | "financials_manage"
  | "account_manage"
  | "user_management"
  | "accept_terms_and_conditions";

export interface UserClaims {
  supplier_permissions: Permission[];
  supplier_login_id: number;
}

export interface StaffClaims {
  user_permissions: Permission[];
  user_id: number;
}

const { firebaseConfig } = require("../config/env");
const UNAUTHORIZED_STATUS = 401;

const getFirebaseUser = async (bearerToken: string): Promise<UserClaims> => {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      ...firebaseConfig,
      credential: firebaseAdmin.credential.cert(firebaseConfig.googleAppCredentials),
    });
  }

  const jwt = bearerToken.replace("Bearer ", "");
  const decoded = await firebaseAdmin.auth().verifyIdToken(jwt);
  const { uid } = decoded;
  const userData = await firebaseAdmin.auth().getUser(uid);

  return userData.customClaims as UserClaims;
};

export default (permission: Permission) => async (ctx: Context, next: Next): Promise<void> => {
  try {
    const bearerToken = await ctx.get("Authorization");
    const sessionId = ctx.cookies.get("PHPSESSID");

    if (!bearerToken && !sessionId) {
      ctx.throw(UNAUTHORIZED_STATUS);
    }

    const user = await getFirebaseUser(bearerToken);
    const roles = user["supplier_permissions"];
    const id = user["supplier_login_id"];

    ctx.state.user = {
      type: "supplier",
      id,
    };

    if (!roles.length || !roles.includes(permission)) {
      ctx.throw(UNAUTHORIZED_STATUS);
    }

    await next();
  } catch (error) {
    ctx.throw(UNAUTHORIZED_STATUS);
  }
};
