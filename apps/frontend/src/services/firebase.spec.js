import Firebase from "@Services/firebase";

const assign = jest.fn();
Object.defineProperty(window, "location", {
  writable: true,
  value: {
    assign,
  },
});

const mockSignInWithEmailAndPassword = jest.fn();
const mockSignOut = jest.fn();
const mockGetIdToken = jest.fn();
const mockCurrentUser = {
  getIdToken: mockGetIdToken,
};
jest.mock("firebase/app", () => {
  return {
    auth: () => ({
      signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
      signOut: mockSignOut,
      onAuthStateChanged: (resolve) => resolve(mockCurrentUser),
      currentUser: mockCurrentUser,
    }),
    apps: {
      length: 0,
    },
    initializeApp: jest.fn(),
  };
});

describe("Firebase utility", () => {
  const firebase = new Firebase();

  it("has a method to get the user token", async () => {
    mockGetIdToken.mockResolvedValue("1234");
    expect(await firebase.getToken()).toEqual("1234");
  });

  it("has a method to delete a firebase session", async () => {
    await firebase.logoutUser();
    expect(mockSignOut).toHaveBeenCalled();
    expect(global.window.location.assign).toHaveBeenCalledWith("/login");
  });
});
