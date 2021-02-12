/**
 * Eslint Config
 * We add this file to the root so it can be resolved automatically via eslint
 *
 * @usage "extends": "@reservando/eslint-config/eslint"
 * @see https://eslint.org/docs/developer-guide/shareable-configs#sharing-multiple-configs
 */
module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],

  plugins: ["prettier"],

  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
