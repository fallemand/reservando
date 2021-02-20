import { defineComponent } from "vue";
import Page from "@/components/Page/Page.vue";
import SignupHeader from "./components/SignupHeader.vue";

const SignupPage = defineComponent({
  components: {
    Page,
    SignupHeader,
  },
  mounted(): void {},
});

export default SignupPage;
