import { Component, Vue } from "vue-property-decorator";
import Page from "@Components/Page/Page.vue";
import { BasePagination, PaginationTotals } from "@Components/Pagination";
import BaseSnackbar from "@Components/BaseSnackbar.vue";
import { InfoBox, InfoBoxItem } from "@Components/InfoBox";
import HomePageAgenda from "./components/HomePageAgenda.vue";
import HomePageProductsList from "./components/HomePageProductsList.vue";
import HomePageBookings from "./components/HomePageBookings.vue";
import HomePageReviews from "./components/HomePageReviews.vue";
import HomePageNotifications from "./components/HomePageNotifications.vue";
import HomePageBlog from "./components/HomePageBlog.vue";
import HomeStore from "./store";
import HomePageAccountStatus from "./components/HomePageAccountStatus.vue";

@Component({
  components: {
    Page,
    BasePagination,
    BaseSnackbar,
    InfoBox,
    InfoBoxItem,
    PaginationTotals,
    HomePageAgenda,
    HomePageProductsList,
    HomePageBookings,
    HomePageReviews,
    HomePageAccountStatus,
    HomePageNotifications,
    HomePageBlog,
  },
})
export default class Home extends Vue {
  $store: typeof HomeStore;
  state = this.$store.state;
  isBoxVisible: (page: string, boxId: string) => boolean = this.$store.getters[
    "supplier/isBoxVisible"
  ];

  async created(): Promise<void> {
    await this.$store.dispatch("loadDefaultState");
  }

  get pageProps(): Record<string, unknown> {
    return {
      id: "home",
      title: this.$t("pModules_Header Home"),
      hasTitle: false,
      infoBoxVisible: this.isBoxVisible,
      hideInfoBox: this.$storeAction("supplier/hideInfoBox"),
      tracking: {
        ga: true,
        sentry: true,
        hotjar: true,
        gygCollector: {
          page: "SupplierOverviewPageRequest",
          containerName: "SupplierOverview",
        },
      },
      header: {
        hasPrivilege: this.$store.getters["supplier/hasPrivilege"],
        supplier: this.$store.state.supplier,
      },
    };
  }

  get loadingAccountStatus(): boolean {
    return this.state.modulesLoading.includes("supplier");
  }

  get isAccountStatusComplete(): boolean {
    return (
      (this.state.summary.hasCompanyRegistration ||
        this.state.summary.hasCompanyRegistrationException) &&
      (this.state.summary.hasInsurance || this.state.summary.hasInsurancePolicyException) &&
      this.state.summary.hasPaymentInfo &&
      this.state.summary.hasCompanyLogo
    );
  }
}
