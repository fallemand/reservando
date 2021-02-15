import urls from "@Utils/urls";
import sanitizeHTML from "@Utils/sanitize-html";
import isMobile from "@Utils/is-mobile";
import firebase from "firebase";

export default {
  install: (app, user: firebase.User): void => {
    app.config.globalProperties.$urls = urls;
    app.config.globalProperties.$user = user;
    app.config.globalProperties.$isMobile = isMobile;
    app.config.globalProperties.$sanitizeHTML = sanitizeHTML;
  },
};
