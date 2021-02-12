import HomePageService from "./service";

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
});
