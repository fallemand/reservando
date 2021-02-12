import urls from "@Utils/url-helper";
import sanitizeHTML from "@Utils/sanitize-html";
import isMobile from "@Utils/is-mobile";
import { VueConstructor } from "vue";

export default {
  async install(Vue: VueConstructor): Promise<void> {
    /* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */
    Vue.prototype.$urls = urls;
    Vue.prototype.$storeAction = function $storeAction(action: string) {
      return (params: any): (() => void) => this.$store.dispatch(action, params);
    };
    Vue.prototype.$isMobile = isMobile;
    Vue.prototype.$sanitizeHTML = (value: string): string => sanitizeHTML(value);
  },
};
