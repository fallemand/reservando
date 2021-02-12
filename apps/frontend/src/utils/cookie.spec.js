import Cookie from "./cookie";

const COOKIE_NAME = "cookie_monster";

describe("Cookie utility", () => {
  const cookie = new Cookie(COOKIE_NAME);

  beforeEach(() => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
    });
  });

  it("has a cookie name property", async () => {
    expect(cookie.name).toBe(COOKIE_NAME);
  });

  it("can create a cookie", async () => {
    expect(typeof cookie.setCookieVal).toBe("function");

    cookie.setCookieVal("1234");
    expect(window.document.cookie.includes("1234")).toBe(true);
  });

  it("can retrieve a created cookie", () => {
    cookie.setCookieVal("1234");
    expect(cookie.getCookieVal()).toBe("1234");
  });

  it("can delete a created cookie", () => {
    cookie.setCookieVal("1234");
    expect(cookie.getCookieVal()).toBe("1234");

    cookie.deleteCookie();
    expect(cookie.getCookieVal()).toBe(undefined);
  });
});
