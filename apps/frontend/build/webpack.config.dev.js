const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpackConfig = require("./webpack.config.common");
const env = require("../config/env");

module.exports = {
  ...webpackConfig,
  mode: "development",
  devtool: "source-map",
  plugins: [
    ...webpackConfig.plugins,
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
      GLOBAL: {
        // https://webpack.js.org/plugins/define-plugin/#feature-flags
        ENV: JSON.stringify(env),
      },
    }),
  ],
  output: {
    ...webpackConfig.output,
    filename: "[name]/bundle.js",
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
