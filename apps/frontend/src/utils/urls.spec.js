import { urls, getUrlWithParams } from "@Utils/urls";

describe("URL utility", () => {
  it("has a mapping of sections and pages urls", async () => {
    expect(Object.values(urls).length).toBeGreaterThan(0);
  });

  it("has a method to get a url with params", async () => {
    expect(typeof getUrlWithParams).toBe("function");
  });

  it("Returns correct URL when passed params", async () => {
    expect(
      getUrlWithParams(urls.products.create.pricing, {
        tourId: 1103,
        pricingId: 145,
      }),
    ).toBe("/products/create/#/pricing?tourId=1103&pricingId=145");

    expect(getUrlWithParams(urls.products.create.pricing)).toBe("/products/create/#/pricing");
  });

  it("Returns correct URL when passed a hash", async () => {
    expect(getUrlWithParams(urls.products.details.index(1103), {}, "setup")).toBe(
      "/products/details?tour_id=1103#setup",
    );
  });

  it("Returns correct URL for resuming wizard", async () => {
    expect(urls.products.create.tourResume(1103, 1103)).toBe(
      "/products/create/#/title?tourId=1103&optionId=1103",
    );
  });

  it("should have a list of urls", () => {
    expect(urls).toMatchSnapshot();
  });
});
