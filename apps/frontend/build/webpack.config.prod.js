const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpackConfig = require("./webpack.config.common");
const config = require("../config/config");
const env = require("../config/env");
const CompressionPlugin = require("compression-webpack-plugin");

// Define list of dependencies to generate vendor.js
const vendorList = [
  "node_modules/core-js/stable",
  "node_modules/axios",
  "node_modules/cuid",
  "node_modules/dd-trace",
  "node_modules/lodash",
  "node_modules/query-string",
  "node_modules/vue",
  "node_modules/vue-i18n",
  "node_modules/vue-router",
  "node_modules/vuejs-datepicker",
  "node_modules/vue-property-decorator",
  "node_modules/vue-line-clamp",
  "node_modules/vuex",
  "node_modules/vuex-class",
  "node_modules/vue-class-component",
  "node_modules/camelcase-keys",
  "node_modules/core-js",
];

module.exports = {
  ...webpackConfig,
  mode: "production",
  plugins: [
    ...webpackConfig.plugins,
    new MiniCssExtractPlugin({
      filename: `${config.assets.folder}/[name].[chunkhash].css`,
    }),
    new webpack.DefinePlugin({
      GLOBAL: {
        ENV: JSON.stringify(env),
      },
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      filename: "[file]",
      deleteOriginalAssets: true,
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: new RegExp(`(${vendorList.join("|")})`),
          chunks: "all",
          name: "vendors",
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
  },
  output: {
    ...webpackConfig.output,
    publicPath: config.assets.cdnUrl,
    filename: `${config.assets.folder}/[name].[contenthash].js`,
  },
};
