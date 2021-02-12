module.exports = {
  displayName: "Backend",
  rootDir: "./",
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "babel-jest",
  },
  testMatch: ["<rootDir>/**/*.spec.js"],
  collectCoverageFrom: ["*.{js,ts}", "{config,controllers,mocks,services,utils}/**/*.{js,vue,ts}"],
};
