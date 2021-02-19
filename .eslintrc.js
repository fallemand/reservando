const config = require("./apps/frontend/config/config");

module.exports = {
  extends: [
    "@reservando/eslint-config/config/eslint",
    "@reservando/eslint-config/config/eslint-typescript",
    "@reservando/eslint-config/config/eslint-jest",
    "@reservando/eslint-config/config/eslint-vue",
  ],
  rules: {
    "vue/no-v-html": "off",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "jest/no-try-expect": "off",
    "jest/no-conditional-expect": "off",
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],
  globals: {
    GLOBAL: true,
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            alias: config.paths,
            extensions: config.extensions,
          },
        },
      },
    },
  },
};
