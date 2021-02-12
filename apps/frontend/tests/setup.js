import { config } from "@vue/test-utils";
import urls from "@Utils/url-helper";
import cleanSnapshot from "./clean-snapshot";

const env = require("@Config/env");

// Make $t available to all components
config.mocks.$t = (key) => key;
config.mocks.$urls = urls;
// eslint-disable-next-line prettier/prettier
config.mocks.$storeAction = jest.fn(() => () => '$storeAction');
config.mocks.$logger = {
  log: jest.fn(),
};
config.mocks.$sanitizeHTML = (value) => value;
config.mocks.$isMobile = false;
config.mocks.$browser = {
  webp: true,
  ie11: false,
};

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

jest.mock("@Utils/i18n", () => ({
  t: (key) => key,
}));

// Remove istanbul comments from snapshot
global.cleanSnapshot = cleanSnapshot;

// Make tests fail if they throw warnings
const error = console.error;
console.error = (...params) => {
  error.apply(console, params); // keep default behaviour
  throw "This test contains warnings";
};
