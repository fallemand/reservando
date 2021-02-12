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
