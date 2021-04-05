import { create } from "@storybook/theming";
import colors from "!style-loader!css-loader!sass-loader!@reservando/design-system/styles/_colors.scss";
import logoSvg from "!url-loader!@reservando/design-system/images/logo-ui.svg";


export default create({
  base: "light",

  colorPrimary: colors["primary-500"],
  colorSecondary: colors["primary-700"],

  // UI
  appBg: colors["others-white"],
  appContentBg: colors["others-white"],
  appBorderColor: "#fffef8",
  appBorderRadius: 4,

  // Typography
  fontBase: "'Montserrat', Arial, sans-serif",

  // Text colors
  textColor: "#2b2b2b",
  textMutedColor: "white",
  textInverseColor: "white",

  // Toolbar default and active colors
  barTextColor: colors["others-white"],
  barSelectedColor: colors["others-white"],
  barBg: colors["primary-700"],

  // Form colors
  inputBg: "white",
  inputBorder: "#ddd",
  inputTextColor: "#2b2b2b",
  inputBorderRadius: 4,

  brandTitle: "Design System",
  brandUrl: "/",
  brandImage: logoSvg,

  //fontCode: "Lucida Console",
  //gridCellSize: 900,
});
