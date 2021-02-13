const path = require("path");

const config = {
  useMocks: false,
  assets: {
    cdnUrl: "https://cdn.reservando.com/frontend/",
    folder: "assets",
  },
  entries: {
    ".": "./src/pages/home/index.ts",
    login: "./src/pages/login/index.ts",
  },
  paths: {
    "@Pages": path.resolve(__dirname, "../src/pages"),
    "@Services": path.resolve(__dirname, "../src/services"),
    "@Components": path.resolve(__dirname, "../src/components"),
    "@Assets": path.resolve(__dirname, "../src/assets"),
    "@Modules": path.resolve(__dirname, "../src/modules"),
    "@Utils": path.resolve(__dirname, "../src/utils"),
    "@Types": path.resolve(__dirname, "../src/types"),
    "@Config": path.resolve(__dirname, "../config"),
    "@Server": path.resolve(__dirname, "../server"),
  },
  firebaseClientConfig: {
    apiKey: "AIzaSyBa6F9Xgl5tiSuCR75oR1-2lmsBSzbgjfk",
    authDomain: "reservando-club.firebaseapp.com",
    projectId: "reservando-club",
    storageBucket: "reservando-club.appspot.com",
    messagingSenderId: "660411980358",
    appId: "1:660411980358:web:47e51c0e967db71336c847",
  },
  extensions: [".vue", ".ts", ".js", ".css", ".d.ts"],
  dateFormatOptions: {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  },
  dateShortFormatOptions: {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  },
};

module.exports = config;
