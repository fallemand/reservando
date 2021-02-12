import queryString from "query-string";
import { ProductListStatus } from "@Pages/products/list/types";

const getFAQArticle = (articleId: string): string => {
  return `https://supplier-support.reservando.com/en/support/solutions/articles/${articleId}`;
};

const urls = {
  index: "/",
  home: "/home",
  company: "https://www.reservando.com/about",
  customer: "https://www.reservando.com",
  specialOffers: "/special-offers",
  specialOfferCreate: "/special-offers", // TODO: We don't have a create link
  products: {
    create: {
      index: "/products/create/",
      title: "/products/create/#/title",
      option: "/products/create/#/optionSetup",
      pictures: "/products/create/#/pictures",
      pricing: "/products/create/#/pricing",
      availability: "/products/create/#/availability",
      tourEdit: (tourId: number): string => `/products/create/#/title?tourId=${tourId}`,
      tourResume: (tourId: number, optionId: number | string): string =>
        `/products/create/#/title?tourId=${tourId}&optionId=${optionId}`,
      tourNewOption: (tourId: number): string =>
        `/products/create/#/optionSetup?tourId=${tourId}&optionId=new`,
      optionEdit: (tourId: number, optionId: number): string =>
        `/products/create/#/optionSetup?tourId=${tourId}&optionId=${optionId}`,
      availabilityEdit: (tourId: number, optionId: number, availabilityId = "new"): string =>
        `/products/create/#/availability?tourId=${tourId}&optionId=${optionId}&availabilityId=${availabilityId}`,
      pricingEdit: (tourId: number, optionId: number, pricingId: number | string = "new"): string =>
        `/products/create/#/pricing?tourId=${tourId}&optionId=${optionId}&pricingId=${pricingId}`,
    },
    details: {
      index: (tourId: number): string => `/products/details?tour_id=${tourId}`,
      optimize: (tourId: number): string => `/products/details?tour_id=${tourId}#optimize`,
      setup: (tourId: number): string => `/products/details?tour_id=${tourId}#setup`,
      availabilities: (tourId: number, connectPricing?: number): string =>
        `/products/details?tour_id=${tourId}${
          connectPricing ? `&connect_pricing=${connectPricing}` : ""
        }#availability`,
      changeRequests: (tourId: number): string =>
        `/products/details?tour_id=${tourId}#changerequests`,
    },
    list: (status: ProductListStatus = "all"): string => `/products/list#status=${status}`,
  },
  companyDetails: "/company-details",
  accountManagement: "/account-management",
  paymentBilling: "/payment-billing",
  paymentBillingPaymentsTab: "/payment-billing#payment-details",
  attributeCollector: "/attribute-collector",
  notFound: "/not-found",
  ecoCertification: "/eco-certification",
  ecoCertificationFAQ:
    "https://supplier-support.reservando.com/en/support/solutions/articles/15000036623-getting-an-eco-badge-for-your-activities",
  bookings: "/bookings",
  bookingsTourId: (tourId: number): string => `/bookings#tourIds[]=${tourId}`,
  reviews: "/reviews",
  register: "/register",
  reviewsTourId: (tourId: number): string => `/reviews#tourIds[]=${tourId}`,
  agenda: "/agenda",
  agendaWithParams: (params): string => {
    return `/agenda#${queryString.stringify(params, {
      arrayFormat: "bracket",
    })}`;
  },
  contact: "/contact",
  login: "/login",
  loginRedirect: (redirectUrl: string): string => {
    // Avoid adding the param infinitely
    if (redirectUrl.includes("redirectUrl")) {
      return urls.login;
    }

    return `/login/#/?redirectUrl=${redirectUrl}`;
  },
  forgotPassword: "/login/#/forgot-password",
  calendar: "/calendar",
  legal: "/legal",
  termsUse: "/terms-use",
  termsOfBusiness: "https://www.reservando.com/terms_of_business",
  privacyPolicy: "https://www.reservando.com/privacy_policy",
  termsConditions: {
    terms: "/terms-conditions#terms",
    platformRules: "/terms-conditions#platform-rules",
  },
  supplierBlog: "https://supplier-blog.reservando.com/",
  social: {
    blog: "https://www.reservando.com/magazine/",
    twitter: "https://twitter.com/reservando",
    facebook: "https://www.facebook.com/reservando/",
  },
  partnerPortal: "http://partner.reservando.com/",
  integratorPortal: "http://integrator.reservando.com/",
  faqs: {
    main: "https://supplier-support.reservando.com/en/support/home",
    sampleVoucher: getFAQArticle("15000036546"),
    options: getFAQArticle("15000028789"),
    location: getFAQArticle("15000037433"),
  },
};

interface Params {
  [key: string]: string | number;
}

const getUrlWithParams = (url: string, params?: Params, hash?: string): string => {
  const hasParams = params && Object.values(params).length > 0;

  if (!hasParams && !hash) {
    return url;
  }

  const hashString = hash ? `#${hash}` : "";

  const paramsString = hasParams
    ? `?${Object.keys(params).reduce(
        (previous, key, index) =>
          index === 0 ? `${key}=${params[key]}` : `${previous}&${key}=${params[key]}`,
        "",
      )}`
    : "";

  return `${url}${paramsString}${hashString}`;
};

export { urls, getUrlWithParams };
