const config = require("./config/config");

module.exports = {
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
