export type NODE_ENV = "development" | "testing" | "production";

const env = process.env.NODE_ENV as NODE_ENV;
const port = process.env.PORT || 3005;

const environment = {
  isDevelopment: env === "development",
  isTesting: env === "testing",
  isProduction: env === "production",
  env,
  port,
  firebaseConfig: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    googleAppCredentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || "{}"),
  },
};

export default environment;
