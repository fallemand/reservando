const path = require("path");

const config = {
  useMocks: false,
  assets: {
    cdnUrl: "https://cdn.reservando.com/frontend/",
    folder: "assets",
  },
  entries: {
    home: "./src/pages/home/index.ts",
    login: "./src/pages/login/index.ts",
    signup: "./src/pages/signup/index.ts",
  },
  paths: {
    "@/config": path.resolve(__dirname, "../config"),
    "@": path.resolve(__dirname, "../src"),
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
