import urls from "@Utils/urls";
import sanitizeHTML from "@Utils/sanitize-html";
import isMobile from "@Utils/is-mobile";
import { VueConstructor } from "vue";
import { User } from "firebase/app";

export default {
  async install(Vue: VueConstructor, user: User): Promise<void> {
    /* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */
    Vue.prototype.$urls = urls;
    Vue.prototype.$user = user;
    Vue.prototype.$storeAction = function $storeAction(action: string) {
      return (params: any): (() => void) => this.$store.dispatch(action, params);
    };
    Vue.prototype.$isMobile = isMobile;
    Vue.prototype.$sanitizeHTML = (value: string): string => sanitizeHTML(value);
  },
};
