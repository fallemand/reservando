const urls = {
  home: "/",
  login: "/login",
  termsOfService: "/home",
  privacyPolicy: "/home",
  loginRedirect: (redirectUrl: string): string => {
    // Avoid adding the param infinitely
    if (redirectUrl.includes("redirectUrl")) {
      return urls.login;
    }

    return `/login/#/?redirectUrl=${redirectUrl}`;
  },
};

export default urls;
