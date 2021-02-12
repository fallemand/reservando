import { Component, Vue } from "vue-property-decorator";
import Page from "@Components/Page/Page.vue";
import HomeStore from "./store";

@Component({
  components: {
    Page,
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
}
