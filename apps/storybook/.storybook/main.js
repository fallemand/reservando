const path = require("path");

module.exports = {
  stories: [
    "../stories/**/*.story.mdx",
    "../node_modules/@reservando/design-system/**/*.story.mdx",
  ],
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
    config.resolve.alias = {
      ...config.resolve.alias,
      "@storybook/addon-docs/blocks": path.resolve("./node_modules/@storybook/addon-docs/blocks"),
      "@mdx-js/react": path.resolve("./node_modules/@mdx-js/react"),
      "@reservando/design-system": path.resolve("./node_modules/@reservando/design-system"),
    };
    return config;
  },
};
