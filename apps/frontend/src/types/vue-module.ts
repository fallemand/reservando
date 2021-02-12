import { Icons } from "@Components/Icons";
import { urls } from "@Utils/url-helper";

declare module "vue/types/vue" {
  interface Vue {
    $icons: Icons;
    $urls: typeof urls;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $storeAction: (action: string) => (param?: any) => void;
    $sanitizeHTML: (param: string) => string;
    $isMobile: boolean;
  }
}
