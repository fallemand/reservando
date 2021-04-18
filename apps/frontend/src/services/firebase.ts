import firebase from "firebase/app";
import "firebase/auth";
import { firebaseClientConfig } from "@/config/config";
import urls from "@/utils/urls";

export type Role = "admin" | "user" | "guest";

class Firebase {
  instance: firebase.app.App;

  constructor() {
    this.instance = !firebase.apps.length
      ? firebase.initializeApp(firebaseClientConfig)
      : firebase.app();
  }

  getUser(): Promise<firebase.User> {
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

  async getToken(): Promise<string> {
    const user = await this.getUser();
    const token = await user.getIdToken();
    return token;
  }

  async logoutUser(): Promise<void> {
    await firebase.auth().signOut();
    window.location.assign(urls.login);
  }
}

export default Firebase;
