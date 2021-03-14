const config = require("./config/config");

module.exports = {
  extends: ["../../.eslint-config.js"],
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
