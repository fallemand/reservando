import { config } from "@vue/test-utils";
import urls from "@/utils/urls";
import cleanSnapshot from "./clean-snapshot";

const env = require("@/config/env");
// Make $t available to all components
config.global.mocks.$t = (key) => key;
config.global.mocks.$urls = urls;
config.global.mocks.$sanitizeHTML = (value) => value;
config.global.mocks.$isMobile = false;

// Remove unnecessary warnings from tests
config.logModifiedComponents = false;

// Set globals
global.GLOBAL = {
  ENV: env,
  SECRETS: {
    googleMapsKey: "__GOOGLE-KEY__",
    googleCaptchaKey: "__GOOGLE-KEY__",
    googleClientId: "__GOOGLE-ID__",
    firebase: "{}",
  },
};

// Remove istanbul comments from snapshot
global.cleanSnapshot = cleanSnapshot;

// Make tests fail if they throw warnings
const error = console.error;
console.error = (...params) => {
  error.apply(console, params); // keep default behaviour
  throw "This test contains warnings";
};
