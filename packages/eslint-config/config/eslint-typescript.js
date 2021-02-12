/**
 * Eslint Typescript Config
 * We add this file to the root so it can be resolved automatically via eslint
 *
 * @usage "extends": "@reservando/eslint-config/eslint-typescript"
 * @see https://eslint.org/docs/developer-guide/shareable-configs#sharing-multiple-configs
 */
module.exports = {
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],

  plugins: ["@typescript-eslint", "prettier"],

  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
};
