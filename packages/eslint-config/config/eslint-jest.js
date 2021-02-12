/**
 * Eslint Jest Config
 * We add this file to the root so it can be resolved automatically via eslint
 *
 * @usage "extends": "@reservando/eslint-config/eslint"
 * @see https://eslint.org/docs/developer-guide/shareable-configs#sharing-multiple-configs
 */
module.exports = {
  extends: ["plugin:jest/recommended"],

  plugins: ["jest"],

  env: {
    jest: true,
    "jest/globals": true,
  },
};
