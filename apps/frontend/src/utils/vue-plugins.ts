import { App } from "vue";
import urls from "@/utils/urls";
import sanitizeHTML from "@/utils/sanitize-html";
import isMobile from "@/utils/is-mobile";
import icons from "@reservando/design-system/components/Icon/icons";
import { Icon } from "@reservando/design-system";
import firebase from "firebase";

export default {
  install: (app: App, user: firebase.User): void => {
    app.config.globalProperties.$urls = urls;
    app.config.globalProperties.$user = user;
    app.config.globalProperties.$isMobile = isMobile;
    app.config.globalProperties.$sanitizeHTML = sanitizeHTML;
    app.config.globalProperties.$icons = icons;
    app.component("Icon", Icon);
  },
};
