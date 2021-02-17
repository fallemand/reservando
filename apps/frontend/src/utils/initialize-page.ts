import FirebaseService, { Role } from "@/services/firebase";
import urls from "@/utils/urls";

interface Params {
  requiredRole?: Role;
  redirectIfLoggedIn?: boolean;
}

const initializePage = async (params: Params = {}): Promise<void> => {
  const firebaseService = new FirebaseService();
  const user = await firebaseService.getUser();
  if (user && params.redirectIfLoggedIn) {
    window.location.assign(urls.home);
    throw "Redirecting | logged user";
  }
  if (!user && params.requiredRole) {
    window.location.assign(urls.login);
    throw "Redirecting | missing role";
  }
};

export default initializePage;
