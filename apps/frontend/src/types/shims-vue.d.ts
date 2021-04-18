import urls from "@/utils/urls";
import firebase from "firebase";
import { Icons } from "@reservando/design-system";
import { Store } from 'vuex';
import { RootState } from "./globals";

declare module "@vue/runtime-core" {
  //Bind to `this` keyword
  interface ComponentCustomProperties {
    $urls: typeof urls;
    $user: firebase.User;
    $sanitizeHTML: (param: string) => string;
    $isMobile: boolean;
    $icons: typeof Icons;
    $store: Store<RootState>
  }
}
