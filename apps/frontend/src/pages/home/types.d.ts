import { RootState } from "@Types/globals";

export interface SupplierSummary {
  hasCompanyRegistrationException: boolean;
  hasInsurancePolicyException: boolean;
  hasCompanyRegistration: boolean;
  hasInsurance: boolean;
  hasPaymentInfo: boolean;
  hasCompanyLogo: boolean;
  hasBookings: boolean;
  hasReviews: boolean;
  hasRecentReviews: boolean;
  hasProducts: boolean;
  hasActiveProducts: boolean;
  hasPendingBookings: boolean;
  hasProductWithMissingInformation: boolean;
  hasExpiredAvailabilities: boolean;
  hasAvailabilitiesExpiringSoon: boolean;
}

export interface HomeState extends RootState {
  isLoading: boolean;
}

export interface HomeModulesResponse {
  bookings: BookingsData;
  reviews: ReviewsData;
  supplier: SupplierSummary;
}

export interface ModulesQuery {
  modules: string[];
}

export interface BookingsData {
  bookingsCount: number;
  ticketsCount: number;
  bookingsPercentage?: number;
  ticketsPercentage?: number;
}

export interface ReviewsData {
  reviewsAverage: number;
  reviewsPercentage: number;
}

export interface BlogData {
  authors: Author[];
  posts: RawPost[];
  categories: Category[];
  media: Media[];
}

export interface Category {
  name: string;
  slug: string;
  id: number;
}

export interface Media {
  title: {
    rendered: string;
  };
  source_url: string;
  id: number;
}

export interface Author {
  name: string;
  id: number;
}

export interface Post {
  id: number;
  date: Date;
  link: string;
  title: string;
  author: string;
  categories: string[];
  image: string;
}

export interface RawPost {
  id: number;
  date: Date;
  status: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  categories: number[];
  featuredMedia: number;

  // hack for camelCaseKeys
  [key: string]: unknown;
}
