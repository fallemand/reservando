import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import HomePage from "@Pages/home/HomePage.vue";
import supplier from "@Modules/supplier/store";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("HomePage", () => {
  let storeData;

  beforeEach(() => {
    storeData = {
      state: {
        summary: {
          hasCompanyRegistrationException: true,
          hasInsurancePolicyException: true,
          hasCompanyRegistration: true,
          hasInsurance: true,
          hasPaymentInfo: true,
          hasCompanyLogo: true,
          hasBookings: true,
          hasReviews: true,
          hasRecentReviews: true,
          hasProducts: true,
          hasActiveProducts: true,
          hasPendingBookings: false,
          hasProductWithMissingInformation: false,
          hasExpiredAvailabilities: false,
          hasAvailabilitiesExpiringSoon: false,
        },
        modulesLoading: [],
        products: {
          results: [],
          total: 0,
        },
        bookings: {
          bookingsCount: "222",
          bookingsPercentage: 1.03,
          ticketsCount: "122",
          ticketsPercentage: 3.04,
        },
        reviews: {
          reviewsAverage: "4.59",
          reviewsPercentage: 3.99,
        },
        blogPosts: [],
      },
      actions: {
        loadDefaultState() {
          return Promise.resolve(true);
        },
      },
      getters: {
        isLoading: () => false,
        isAgendaLoading: () => false,
        agendaItemsOfDate: () => [
          {
            date: "2019-09-15",
          },
          {
            date: "2019-09-16",
          },
        ],
      },
      modules: {
        supplier: {
          ...supplier,
          state: {
            isConfirmed: true,
            isOutbound: true,
            privileges: ["bookings_manage", "inventory_manage", "products_manage"],
          },
        },
      },
    };
  });

  it("should render with modules", () => {
    const wrapper = shallowMount(HomePage, {
      store: new Vuex.Store(storeData),
      localVue,
    });
    expect(cleanSnapshot(wrapper)).toMatchSnapshot();
  });

  it("should render with modules and Account Status", () => {
    storeData.state.summary = {
      ...storeData.state.summary,
      hasCompanyLogo: false,
      hasPendingBookings: true,
      hasProductWithMissingInformation: true,
      hasExpiredAvailabilities: true,
      hasAvailabilitiesExpiringSoon: true,
    };
    const wrapper = shallowMount(HomePage, {
      store: new Vuex.Store(storeData),
      localVue,
    });
    expect(cleanSnapshot(wrapper)).toMatchSnapshot();
  });

  it("should render for non-confirmed", () => {
    storeData.modules.supplier.state.isConfirmed = false;

    const wrapper = shallowMount(HomePage, {
      store: new Vuex.Store(storeData),
      localVue,
    });
    expect(cleanSnapshot(wrapper)).toMatchSnapshot();
  });
});
