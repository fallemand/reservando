const mockVerifyIdToken = jest.fn();
const mockGetUser = jest.fn();

import authenticate from "./auth";
import FirebaseAdmin from "firebase-admin";

jest.mock("firebase-admin", () => {
  return {
    credential: {
      cert: jest.fn(() => "credentials"),
    },
    auth: () => ({
      verifyIdToken: mockVerifyIdToken,
      getUser: mockGetUser,
    }),
    apps: {
      length: 0,
    },
    initializeApp: jest.fn(),
  };
});

describe("Authentication Util", () => {
  let ctx, next;

  beforeEach(() => {
    ctx = {
      state: {},
      get: jest.fn(() => "Bearer 123321"),
      throw: jest.fn(),
      cookies: {
        get: jest.fn(),
      },
      response: {
        status: 0,
      },
      request: {
        body: {
          token: "__TOKEN__",
        },
      },
    };

    next = jest.fn();

    next.mockClear();
    ctx.get.mockClear();
    ctx.throw.mockClear();
  });

  it("Should throw 401 Bearer does not exist", async () => {
    const authenticateMiddleware = authenticate("permission");
    await authenticateMiddleware(ctx, next);

    expect(ctx.throw).toHaveBeenCalledWith(401);
  });

  it("Should initializes Firebase Admin SDK with credentials", async () => {
    const authenticateMiddleware = authenticate("permission");
    await authenticateMiddleware(ctx, next);

    expect(FirebaseAdmin.initializeApp).toHaveBeenCalledWith({
      credential: "credentials",
    });
  });

  it("Should get the Authorization Token from Context", async () => {
    const authenticateMiddleware = authenticate("permission");
    await authenticateMiddleware(ctx, next);

    expect(ctx.get).toHaveBeenCalledWith("Authorization");
  });

  it("Should Authenticate if Authorization token exists", async () => {
    mockVerifyIdToken.mockResolvedValue({
      uid: "__UID__",
    });
    const authenticateMiddleware = authenticate("permission");
    await authenticateMiddleware(ctx, next);

    expect(mockVerifyIdToken).toHaveBeenCalledWith("123321");
  });

  it("Should get user data if Authorized", async () => {
    await mockVerifyIdToken.mockResolvedValue({
      uid: "__UID__",
    });
    await mockGetUser.mockResolvedValue({
      customClaims: {
        roles: ["financials_manage"],
      },
    });
    const authenticateMiddleware = authenticate("permission");
    await authenticateMiddleware(ctx, next);

    expect(mockGetUser).toHaveBeenCalledWith("__UID__");
  });

  it("Should call next middleware if user has correct permissions", async () => {
    await mockVerifyIdToken.mockResolvedValue({
      uid: "__UID__",
    });
    await mockGetUser.mockResolvedValue({
      customClaims: {
        roles: ["admin"],
      },
    });
    const authenticateMiddleware = authenticate("admin");
    await authenticateMiddleware(ctx, next);

    expect(ctx.state.user).toEqual({ roles: ["admin"] });
    expect(next).toHaveBeenCalled();
  });

  it("Should send 401 as status if no token exists", async () => {
    await ctx.get.mockResolvedValue("");
    const authenticateMiddleware = authenticate("permission");
    await authenticateMiddleware(ctx, next);

    expect(ctx.throw).toHaveBeenCalledWith(401);
  });

  it("Should send 401 as status if user has wrong permissions", async () => {
    await mockVerifyIdToken.mockResolvedValue({
      permissions: ["financials_manage"],
    });
    const authenticateMiddleware = authenticate("not_financials_manage");
    await authenticateMiddleware(ctx, next);

    expect(ctx.throw).toHaveBeenCalledWith(401);
  });

  it("Should send 401 as status if any error occurs", async () => {
    await mockVerifyIdToken.mockRejectedValue("Error!");
    const authenticateMiddleware = authenticate("not_financials_manage");
    await authenticateMiddleware(ctx, next);

    expect(ctx.throw).toHaveBeenCalledWith(401);
  });
});
