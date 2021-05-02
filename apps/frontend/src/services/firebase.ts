import firebase from "firebase/app";
import "firebase/auth";
import { firebaseClientConfig } from "@/config/config";
import urls from "@/utils/urls";
import { Auth } from "@reservando/commons/types";

class Firebase {
  instance: firebase.app.App;

  constructor() {
    this.instance = !firebase.apps.length
      ? firebase.initializeApp(firebaseClientConfig)
      : firebase.app();
  }

  getFirebaseUser(): Promise<firebase.User> {
    return new Promise<firebase.User>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            resolve(user);
          }
        },
        (err) => reject(err),
      );
    });
  }

  async getUser(): Promise<Auth.User | null> {
    const firebaseUser = await this.getFirebaseUser();
    if (!firebaseUser) {
      return null;
    }
    const idTokenResult = await firebaseUser.getIdTokenResult();
    const user: Auth.User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      emailVerified: firebaseUser.emailVerified,
      displayName: firebaseUser.displayName || "",
      role: idTokenResult.claims.roles ? idTokenResult.claims.roles[0] : null,
    };
    return user;
  }

  async getToken(): Promise<string> {
    const user = await this.getFirebaseUser();
    const token = await user.getIdToken();
    return token;
  }

  async logoutUser(): Promise<void> {
    await firebase.auth().signOut();
    window.location.assign(urls.login);
  }
}

export default Firebase;
