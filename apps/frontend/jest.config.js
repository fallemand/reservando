const { paths } = require("./config/config");

/**
 * Transform relative paths to the jest required format
 * Example: { components(.*)$: "<rootDir>/src/components/$1" }
 */
const relativePaths = {};
Object.keys(paths).forEach((key) => {
  relativePaths[`${key}/(.*)$`] = `${paths[key]}/$1`;
});

module.exports = {
  displayName: "Frontend",
  rootDir: "./",
  moduleFileExtensions: ["js", "json", "vue", "ts"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
    "^.+\\.ts$": "babel-jest",
  },
  collectCoverageFrom: ["{config,src}/**/*.{js,vue,ts}"],
  moduleNameMapper: {
    ".+\\.(png|jpg|ico)$": "<rootDir>/tests/mock-image.js",
    ".+\\.(svg)$": "<rootDir>/tests/mock-svg.js",
    ...relativePaths,
  },
  testMatch: ["<rootDir>/**/*.spec.js"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@reservando/design-system)"],
  setupFiles: ["<rootDir>/tests/setup.js"],
};
