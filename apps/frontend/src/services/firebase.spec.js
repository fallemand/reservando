const mockSignInWithEmailAndPassword = jest.fn();
const mockSignOut = jest.fn();
const mockGetIdToken = jest.fn();
const mockCurrentUser = {
  getIdToken: mockGetIdToken,
};

import Firebase from "@Services/firebase";

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
  it("has a method to create a firebase session", async () => {
    await firebase.createSession("test@reservando.com", "123");
    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith("test@reservando.com", "123");
  });

  it("has a method to get the user token", async () => {
    mockGetIdToken.mockResolvedValue("1234");
    expect(await firebase.getTokenId()).toEqual("1234");
  });

  it("has a method to delete a firebase session", async () => {
    await firebase.deleteSession();
    expect(mockSignOut).toHaveBeenCalled();
  });
});
