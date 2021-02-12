import { Component, Vue } from "vue-property-decorator";
import Page from "@Components/Page/Page.vue";
import NotFoundStore from "./store";
import { GygButton } from "@reservando/design-system";

@Component({
  components: {
    Page,
    GygButton,
  },
})
export default class NotFoundPage extends Vue {
  $store: typeof NotFoundStore;
  state = this.$store.state;
  isBoxVisible: (page: string, boxId: string) => boolean = this.$store.getters[
    "supplier/isBoxVisible"
  ];

  get redirectLink(): string {
    return this.$store.state.supplier.isLoggedIn ? this.$urls.home : this.$urls.index;
  }

  get pageProps(): Record<string, unknown> {
    return {
      id: "not-found",
      pageTitle: this.$t("pNotFound_cText_BodyTitle"),
      infoBoxVisible: this.isBoxVisible,
      hideInfoBox: this.$storeAction("supplier/hideInfoBox"),
      tracking: {
        ga: true,
        sentry: true,
        gygCollector: {
          containerName: "SupplierNotFound",
          page: "SupplierNotFoundPageRequest",
        },
      },
      header: {
        supplier: this.state.supplier,
        hasPrivilege: this.$store.getters["supplier/hasPrivilege"],
      },
    };
  }
}
