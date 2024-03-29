import FirebaseService from "@/services/firebase";
import urls from "@/utils/urls";
import { Auth } from "@reservando/commons/types";

interface Params {
  requiredRole?: Auth.Role;
  redirectIfLoggedIn?: boolean;
}

const initializePage = async (params: Params = {}): Promise<Auth.User | null> => {
  const firebaseService = new FirebaseService();
  const user = await firebaseService.getUser();
  if (user && params.redirectIfLoggedIn) {
    window.location.assign(urls.home);
    throw "Redirecting | logged user";
  }
  if (
    params.requiredRole &&
    (!user || (user.role !== "admin" && params.requiredRole !== user.role))
  ) {
    window.location.assign(urls.login);
    throw "Redirecting | missing role";
  }
  return user;
};

export default initializePage;
