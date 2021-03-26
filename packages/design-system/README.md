# Linters config

> `eslint` & `prettier` standard configs for Reservando.  
> It allows to work with `husky` and `lint-staged`

### Getting started

1. Install dependency. Make sure to use `--save` so it installs all the required dependencies `eslint` `prettier`, `husky`, `plugins`, etc

```shell
npm install --save @reservando/eslint-config
```

2. Create file `.eslintrc.js`.  
   Add only the configs you need for your project.

```js
module.exports = {
  extends: [
    "@reservando/eslint-config/config/eslint",
    "@reservando/eslint-config/config/eslint-testcafe",
    "@reservando/eslint-config/config/eslint-jest",
    "@reservando/eslint-config/config/eslint-typescript",
    "@reservando/eslint-config/config/eslint-vue",
  ],
  rules: {
    // My custom rules
  },
};
```

3. Create file `.prettierrc.js`

```js
const sharedConfig = require("@reservando/eslint-config/config/prettier");

module.exports = {
  ...sharedConfig,
  // My custom rules
};
```

4. Update your `package.json`

```json
{
  "scripts": {
    "lint": "npm run lint:prettier && npm run lint:eslint",
    "lint:fix": "npm run lint:prettier -- --write && npm run lint:eslint -- --fix",
    "lint:eslint": "eslint '**/*.{js,ts,vue}'",
    "lint:prettier": "prettier --check '**/*.{md,scss,json}'"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,ts,vue}": "eslint --fix",
    "*.{md,scss,json}": "prettier --write"
  }
}
```
