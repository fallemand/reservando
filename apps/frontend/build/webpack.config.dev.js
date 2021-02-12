const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpackConfig = require("./webpack.config.common");
const config = require("../config/config");
const env = require("../config/env");
const secrets = require("../config/secrets");

if (config.shouldAnalyzeBuild()) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

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
        SECRETS: JSON.stringify(secrets),
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
