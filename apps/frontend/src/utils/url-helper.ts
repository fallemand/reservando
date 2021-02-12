const urls = {
  index: "/",
  home: "/home",
  login: "/login",
  loginRedirect: (redirectUrl: string): string => {
    // Avoid adding the param infinitely
    if (redirectUrl.includes("redirectUrl")) {
      return urls.login;
    }

    return `/login/#/?redirectUrl=${redirectUrl}`;
  },
};

export default urls;
