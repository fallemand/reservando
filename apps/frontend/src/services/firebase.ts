import { GlobalType } from "../types/globals";
import * as firebase from "firebase/app";
import "firebase/auth";

declare const GLOBAL: GlobalType;
class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      const config =
        typeof GLOBAL.SECRETS.firebase === "object"
          ? GLOBAL.SECRETS.firebase
          : JSON.parse(GLOBAL.SECRETS.firebase);
      firebase.initializeApp(config);
    }
  }

  async createSession(email: string, password: string): Promise<void> {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async getTokenId(): Promise<string> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          resolve(token);
        } else {
          resolve("");
        }
      }, reject);
    });
  }

  async deleteSession(): Promise<void> {
    await firebase.auth().signOut();
  }
}

export default Firebase;
