import { actions } from "@Pages/home/store";
import AgendaService from "@Pages/agenda/service";
import ProductsService from "@Pages/products/service";
import HomePageService from "@Pages/home/service";
import { createNewDateFromDate, dateToISOFormatter } from "@Utils/date-utils";

jest.mock("@Pages/agenda/service");
jest.mock("@Pages/products/service");
jest.mock("@Pages/home/service");

describe("HomePage state store", () => {
  it("has action loadDefaultState which should call the load the default state", async () => {
    const context = {
      rootGetters: {
        ["supplier/hasPrivilege"]: jest.fn(),
      },
      commit: jest.fn(),
      dispatch: jest.fn(),
      summary: {
        hasActiveProducts: true,
        hasReviews: true,
        hasBookings: true,
        hasProducts: true,
      },
    };
    await actions.loadDefaultState(context);

    expect(context.dispatch.mock.calls).toEqual([["fetchBlogData"], ["fetchSupplierSummary"]]);
  });
  it("has action fetchAgendaItems which should get agendaItems through the service", async () => {
    const today = new Date();
    const daysFromToday = 30;
    const dateUntil = createNewDateFromDate(today, daysFromToday);
    const context = {
      query: {
        dateFrom: dateToISOFormatter(today),
        dateTo: dateToISOFormatter(dateUntil),
      },
      commit: jest.fn(),
    };

    const agendaService = AgendaService.mock.instances[0];

    agendaService.getAgendaList.mockResolvedValue({
      results: [{ bookingId: 1 }, { bookingId: 2 }],
      total: 2,
    });

    await actions.fetchAgendaItems(context);

    expect(agendaService.getAgendaList).toHaveBeenCalledWith(context.query);
    expect(context.commit.mock.calls).toEqual([
      [
        "SET_MODULE_LOADING",
        {
          isLoading: true,
          module: "agenda",
        },
      ],
      ["SET_AGENDA_ITEMS", [{ bookingId: 1 }, { bookingId: 2 }]],
      [
        "SET_MODULE_LOADING",
        {
          isLoading: false,
          module: "agenda",
        },
      ],
    ]);
  });
  it("has action fetchProducts which should fetch products", async () => {
    const context = {
      commit: jest.fn(),
    };

    const productsService = ProductsService.mock.instances[0];

    productsService.getProductsList.mockResolvedValue({
      results: [{}, {}],
      total: 18,
    });

    await actions.fetchProducts(context);

    expect(productsService.getProductsList).toHaveBeenCalledWith({
      limit: 2,
      page: 0,
    });
    expect(context.commit.mock.calls).toEqual([
      [
        "SET_MODULE_LOADING",
        {
          isLoading: true,
          module: "products",
        },
      ],
      [
        "SET_PRODUCTS",
        {
          results: [{}, {}],
          total: 18,
        },
      ],
      [
        "SET_MODULE_LOADING",
        {
          isLoading: false,
          module: "products",
        },
      ],
    ]);
  });
  it("has action fetchBookings which should fetch the data for modules", async () => {
    const context = {
      commit: jest.fn(),
    };

    const homePageService = HomePageService.mock.instances[0];

    homePageService.getModulesData.mockResolvedValue({
      bookings: {
        bookingsCount: "40",
        bookingsPercentage: 2,
        ticketsCount: "80",
        ticketsPercentage: -2,
      },
    });

    await actions.fetchBookings(context);

    expect(context.commit.mock.calls).toEqual([
      [
        "SET_MODULE_LOADING",
        {
          isLoading: true,
          module: "bookings",
        },
      ],
      [
        "SET_BOOKING_DATA",
        {
          bookingsCount: "40",
          bookingsPercentage: 2,
          ticketsCount: "80",
          ticketsPercentage: -2,
        },
      ],
      [
        "SET_MODULE_LOADING",
        {
          isLoading: false,
          module: "bookings",
        },
      ],
    ]);
  });
  it("has action fetchReviews which should fetch the data for modules", async () => {
    const context = {
      commit: jest.fn(),
    };

    const homePageService = HomePageService.mock.instances[0];

    homePageService.getModulesData.mockResolvedValue({
      reviews: {
        reviewsAverage: "4.59",
        reviewsPercentage: 3.99,
      },
    });

    await actions.fetchReviews(context);

    expect(context.commit.mock.calls).toEqual([
      [
        "SET_MODULE_LOADING",
        {
          isLoading: true,
          module: "reviews",
        },
      ],
      [
        "SET_REVIEWS_DATA",
        {
          reviewsAverage: "4.59",
          reviewsPercentage: 3.99,
        },
      ],
      [
        "SET_MODULE_LOADING",
        {
          isLoading: false,
          module: "reviews",
        },
      ],
    ]);
  });
});
