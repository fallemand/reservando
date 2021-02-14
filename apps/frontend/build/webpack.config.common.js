const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const sass = require("sass");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const env = require("../config/env");
const config = require("../config/config");

const modulesToTranspile = [
  "camelcase-keys",
  "map-obj",
  "camelcase",
  "quick-lru",
  "strict-uri-encode",
  "decode-uri-component",
  "split-on-first",
  "query-string",
];

module.exports = {
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  stats: {
    children: false,
    modules: false,
    entrypoints: false,
    performance: false,
    warnings: false,
    assetsSort: "!size",
  },
  resolve: {
    alias: config.paths,
    extensions: config.extensions,
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  entry: config.entries,
  module: {
    rules: [
      {
        test: /\.vue$/u,
        exclude: /node_modules/u,
        loader: "vue-loader",
      },
      {
        test: /\.(ts|js)?$/,
        loader: "ts-loader",
        exclude: new RegExp(`/node_modules\\/(?!(${modulesToTranspile.join("|")})\\/).*/`),
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
      {
        test: /\.scss$/,
        use: [
          env.isDevelopment ? "vue-style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|gif|png|jpg|webp|ico)(\?.*$|$)/,
        loader: `url-loader`,
        options: {
          limit: 100,
          name: `${config.assets.folder}/images/[hash].[ext]`,
          esModule: false,
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            // SVGs that will be used as a component: They will be injected inline
            include: path.resolve(__dirname, "../src/assets/images/icons/"),
            use: "svg-inline-loader",
          },
          {
            // Specific icons used as background-image: They will be saved as assets
            exclude: path.resolve(__dirname, "../src/assets/images/icons/"),
            use: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ["../dist/*", "!../dist/gettexts*"],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    ...Object.keys(config.entries).map(
      (entry) =>
        new HtmlWebpackPlugin({
          chunks: [entry, "vendors", "runtime"],
          template: "./index.html",
          inject: true,
          filename: `${entry}/index.html`,
        }),
    ),
    new VueLoaderPlugin(),
  ],
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
};
