const path = require("path");

module.exports = {
  stories: ["../stories/**/*.story.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-postcss",
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
        actions: false,
      },
    },
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["vue-style-loader", "css-loader", "sass-loader"],
    });
    return config;
  },
};
