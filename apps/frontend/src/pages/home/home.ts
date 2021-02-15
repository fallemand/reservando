import Vue from "vue";
import Page from "@Components/Page/Page.vue";
import HomeService from "./service";

const homeService = new HomeService();

const HomePage = Vue.extend({
  components: { Page },
  async mounted(): Promise<void> {
    await this.$store.dispatch("loadDefaultState");
    await homeService.getModulesData();
  },
});

export default HomePage;
