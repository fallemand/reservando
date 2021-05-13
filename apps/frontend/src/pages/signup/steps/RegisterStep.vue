<template>
  <div class="register-step">
    <img class="register-step__image" :src="signupSvg" alt="Singup" />
    <h2 class="register-step__title">{{ $t("signup.registerStep.title") }}</h2>
    <ReButton class="register-step__button">
      {{ $t("signup.registerStep.email") }}
    </ReButton>
    <FacebookButton class="register-step__button">
      {{ $t("signup.registerStep.facebook") }}
    </FacebookButton>
    <GoogleButton class="register-step__button" @success="handleSuccess" @error="handleError">
      {{ $t("signup.registerStep.google") }}
    </GoogleButton>
    <p v-if="error">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ReButton } from "@reservando/design-system";
import signupSvg from "@/assets/images/signup.svg";
import FacebookButton from "@/components/FacebookButton.vue";
import GoogleButton from "@/components/GoogleButton.vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";

const RegisterStep = defineComponent({
  components: {
    ReButton,
    FacebookButton,
    GoogleButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const error = ref("");

    const handleSuccess = (uid: string) => {
      store.dispatch("setUser", uid);
      router.push("notifications");
    };

    const handleError = (message: string) => {
      error.value = message;
    };

    return {
      signupSvg,
      handleSuccess,
      handleError,
      error,
    };
  },
});
export default RegisterStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.register-step {
  &__image {
    max-width: 100px;
    min-height: 105px;
    margin: 0 auto;
    margin-bottom: $bdu * 4;
  }

  &__title {
    @extend .re-title-20;
    margin-bottom: $bdu * 4;
    text-align: center;
  }

  &__button {
    margin-bottom: $bdu;
    height: 48px;
  }
}
</style>
