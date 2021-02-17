import { defineComponent } from "vue";
import Page from "@/components/Page/Page.vue";
import HomeService from "./service";

const homeService = new HomeService();

const HomePage = defineComponent({
  components: { Page },
  async mounted(): Promise<void> {
    await this.$store.dispatch("loadDefaultState");
    await homeService.getModulesData();
  },
});

export default HomePage;
