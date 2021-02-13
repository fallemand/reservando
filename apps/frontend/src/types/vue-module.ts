import urls from "@Utils/urls";
import { User } from "firebase/app";

declare module "vue/types/vue" {
  interface Vue {
    $urls: typeof urls;
    $user: User;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $storeAction: (action: string) => (param?: any) => void;
    $sanitizeHTML: (param: string) => string;
    $isMobile: boolean;
  }
}
