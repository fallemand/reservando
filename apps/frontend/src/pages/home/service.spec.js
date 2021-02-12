import HomePageService from "./service";
import rawBlogPosts from "./mocks/data/blog-posts.json";
import blogAuthors from "./mocks/data/blog-authors.json";
import blogCategories from "./mocks/data/blog-categories.json";
import blogMedia from "./mocks/data/blog-media.json";
import camelcaseKeys from "camelcase-keys";

const mockPost = jest.fn();
const mockGet = jest.fn();

jest.mock("@Utils/rest-client", () => () => ({
  post: mockPost,
  get: mockGet,
}));

describe("Booking Service", () => {
  const homePageService = new HomePageService();

  afterEach(() => {
    mockPost.mockClear();
  });

  it("Gets module data", async () => {
    mockPost.mockResolvedValueOnce({
      data: {
        supplier: {
          has_company_registration_exception: true,
          has_insurance_policy_exception: true,
          has_company_registration: false,
          has_insurance: false,
          has_payment_info: false,
          has_company_logo: false,
          has_bookings: true,
          has_reviews: true,
          has_recent_reviews: true,
          has_products: true,
          has_active_products: true,
          has_pending_bookings: true,
          has_product_with_missing_information: true,
          has_expired_availabilities: true,
          has_availabilities_expiring_soon: true,
        },
        bookings: {
          bookings_count: "183",
          bookings_percentage: 15,
          tickets_count: "298",
          tickets_percentage: -3.05,
        },
        reviews: {
          reviews_average: "4.46",
          reviews_percentage: 8.05,
        },
      },
    });

    const response = await homePageService.getModulesData({
      modules: ["summary"],
    });

    expect(mockPost).toHaveBeenCalledWith("/account_summary", {
      components: ["summary"],
    });
    expect(response.supplier).toBeTruthy();
  });

  it("Gets raw blog posts", async () => {
    mockGet.mockResolvedValueOnce({
      data: [],
    });

    await homePageService.getRawBlogPosts(2);

    expect(mockGet).toHaveBeenCalledWith("/posts", {
      params: {
        orderby: "date",
        per_page: 2,
        status: "publish",
      },
    });
  });

  it("Gets blog authors", async () => {
    mockGet.mockResolvedValueOnce({
      data: [],
    });

    await homePageService.getBlogAuthors([1, 2]);

    expect(mockGet).toHaveBeenCalledWith("/users", {
      params: {
        include: [1, 2],
      },
    });
  });

  it("Gets blog categories", async () => {
    mockGet.mockResolvedValueOnce({
      data: [],
    });

    await homePageService.getBlogCategories([1, 2]);

    expect(mockGet).toHaveBeenCalledWith("/categories", {
      params: {
        include: [1, 2],
      },
    });
  });

  it("Gets blog media", async () => {
    mockGet.mockResolvedValueOnce({
      data: [],
    });

    await homePageService.getBlogMedia([1, 2]);

    expect(mockGet).toHaveBeenCalledWith("/media", {
      params: {
        include: [1, 2],
      },
    });
  });

  it("Gets blog posts", async () => {
    homePageService.getRawBlogPosts = jest.fn();
    homePageService.getBlogAuthors = jest.fn();
    homePageService.getBlogCategories = jest.fn();
    homePageService.getBlogMedia = jest.fn();

    homePageService.getRawBlogPosts.mockResolvedValueOnce(
      camelcaseKeys(rawBlogPosts, { deep: true }),
    );
    homePageService.getBlogAuthors.mockResolvedValueOnce(blogAuthors);
    homePageService.getBlogCategories.mockResolvedValueOnce(blogCategories);
    homePageService.getBlogMedia.mockResolvedValueOnce(camelcaseKeys(blogMedia, { deep: true }));

    await homePageService.getBlogPosts(2);

    expect(homePageService.getRawBlogPosts).toHaveBeenCalledWith(2);
    expect(homePageService.getBlogAuthors).toHaveBeenCalledWith([51, 48]);
    expect(homePageService.getBlogCategories).toHaveBeenCalledWith([53, 52, 51]);
    expect(homePageService.getBlogMedia).toHaveBeenCalledWith([1423, 1515]);
  });
});
