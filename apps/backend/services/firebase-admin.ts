import firebaseAdmin from "firebase-admin";
import credential from "../config/firebase-admin-credential.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(credential as firebaseAdmin.ServiceAccount),
  });
}

export const db = firebaseAdmin.firestore();
export default firebaseAdmin;
