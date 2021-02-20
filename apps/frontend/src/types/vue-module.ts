import urls from "@/utils/urls";
import firebase from "firebase";
import icons from "@/components/Icon/icons";

declare module "@vue/runtime-core" {
  //Bind to `this` keyword
  interface ComponentCustomProperties {
    $urls: typeof urls;
    $user: firebase.User;
    $sanitizeHTML: (param: string) => string;
    $isMobile: boolean;
    $icons: typeof icons;
  }
}
