/**
 * Eslint Vue Config
 * We add this file to the root so it can be resolved automatically via eslint
 *
 * @usage "extends": "@reservando/eslint-config/eslint-vue"
 * @see https://eslint.org/docs/developer-guide/shareable-configs#sharing-multiple-configs
 */
module.exports = {
  extends: ["plugin:vue/recommended", "plugin:vue/strongly-recommended", "prettier/vue"],

  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/no-v-html": "off",
  },

  plugins: ["prettier"],

  parser: "vue-eslint-parser",
};
