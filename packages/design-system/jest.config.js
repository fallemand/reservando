/**
 * Transform relative paths to the jest required format
 * Example: { components(.*)$: "<rootDir>/src/components/$1" }
 */

module.exports = {
  displayName: "Design System",
  rootDir: "./",
  moduleFileExtensions: ["js", "json", "vue", "ts"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
    "^.+\\.ts$": "babel-jest",
  },
  collectCoverageFrom: ["{components}/**/*.{js,vue,ts}"],
  moduleNameMapper: {
    ".+\\.(png|jpg|ico)$": "<rootDir>/../../apps/frontend/tests/mock-image.js",
    ".+\\.(svg)$": "<rootDir>/../../apps/frontend/tests/mock-svg.js",
  },
  testMatch: ["<rootDir>/**/*.spec.js"],
};
