import Vue from "vue";
import Plugins from "./vue-plugins";
import FirebaseService, { Role } from "@Services/firebase";
import urls from "@Utils/urls";

interface Params {
  requiredRole?: Role;
  redirectIfLoggedIn?: boolean;
}

const initializePage = async (params: Params = {}): Promise<void> => {
  const firebaseService = new FirebaseService();
  const user = await firebaseService.getUser();
  if (user && params.redirectIfLoggedIn) {
    window.location.assign(urls.home);
    throw "Redirecting";
  }
  if (!user && params.requiredRole) {
    window.location.assign(urls.login);
    throw "Redirecting";
  }
  Vue.use(Plugins, user);
};

export default initializePage;
