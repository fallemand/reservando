import { defineComponent } from "vue";
import firebaseui from "firebaseui";
import firebase from "firebase/app";
import Page from "@/components/Page/Page.vue";

const LoginPage = defineComponent({
  components: {
    Page,
  },
  async mounted(): Promise<void> {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    const firebaseUiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: () => true,
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: this.$urls.home,
      tosUrl: this.$urls.termsOfService,
      privacyPolicyUrl: this.$urls.privacyPolicy,
    };
    ui.start("#firebaseui-auth-container", firebaseUiConfig);
  },
});

export default LoginPage;
