import urls from "./urls";

describe("URL utility", () => {
  it("should have a list of urls", () => {
    expect(urls).toMatchSnapshot();
  });
});
