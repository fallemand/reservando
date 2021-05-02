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
    <GoogleButton class="register-step__button">
      {{ $t("signup.registerStep.google") }}
    </GoogleButton>
    <ContinueButton class="register-step__continue" @click="$router.push('notifications')">
      {{ $t("controls.continue") }}
    </ContinueButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReButton } from "@reservando/design-system";
import ContinueButton from "../components/ContinueButton.vue";
import signupSvg from "@/assets/images/signup.svg";
import FacebookButton from "@/components/FacebookButton.vue";
import GoogleButton from "@/components/GoogleButton.vue";

const RegisterStep = defineComponent({
  components: {
    ReButton,
    ContinueButton,
    FacebookButton,
    GoogleButton,
  },
  computed: {
    signupSvg(): string {
      return signupSvg;
    },
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
