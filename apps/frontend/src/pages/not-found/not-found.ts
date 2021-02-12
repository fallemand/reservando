import { Component, Vue } from "vue-property-decorator";
import Page from "@Components/Page/Page.vue";
import NotFoundStore from "./store";

@Component({
  components: {
    Page,
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
    };
  }
}
