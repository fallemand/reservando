import { Component, Vue } from "vue-property-decorator";
import * as firebaseui from "firebaseui";
import firebase from "firebase/app";
import Page from "@Components/Page/Page.vue";
import FirebaseService from "@Services/firebase";

@Component({
  components: {
    Page,
  },
})
export default class LoginPage extends Vue {
  async mounted(): Promise<void> {
    const firebaseService = new FirebaseService();
    const ui = new firebaseui.auth.AuthUI(firebaseService.instance.auth());
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
  }
}
