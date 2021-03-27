import { create } from "@storybook/theming";

export default create({
  base: "light",

  colorPrimary: "#1a2b49",
  colorSecondary: "#624c67",

  // UI
  appBg: "#fffef8",
  appContentBg: "white",
  appBorderColor: "#fffef8",
  appBorderRadius: 4,

  // Typography
  fontBase: "'Montserrat', Arial, sans-serif",

  // Text colors
  textColor: "#2b2b2b",
  textInverseColor: "white",

  // Toolbar default and active colors
  barTextColor: "white",
  barSelectedColor: "#fffef8",
  barBg: "#624c67",

  // Form colors
  inputBg: "white",
  inputBorder: "#ddd",
  inputTextColor: "#2b2b2b",
  inputBorderRadius: 4,

  brandTitle: "Design System",
  brandUrl: "/",
  brandImage: "https://reservando.club/assets/images/6fa0435b311dd9235a7b7bfa0f461869.svg",
});
