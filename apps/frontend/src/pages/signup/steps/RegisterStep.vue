<template>
  <div class="register-step">
    <img class="register-step__image" :src="signupSvg" alt="Singup" />
    <p class="register-step__intro signup__intro">{{ $t("signup.registerStep.question") }}</p>
    <h2 class="register-step__title">{{ $t("signup.registerStep.title") }}</h2>
    <FacebookButton class="register-step__button">
      {{ $t("signup.registerStep.facebook") }}
    </FacebookButton>
    <GoogleButton class="register-step__button">
      {{ $t("signup.registerStep.google") }}
    </GoogleButton>
    <ReButton class="register-step__button">
      {{ $t("signup.registerStep.email") }}
    </ReButton>
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
    margin: 0 auto;
    margin-bottom: $bdu * 3;
  }
  &__intro{
    margin-bottom: $bdu * 2;
  }
  &__title {
    font-size: 20px;
    font-weight: $font-weight-bold;
    margin-bottom: $bdu * 4;
    letter-spacing: -0.5px;
  }
  &__button {
    margin-bottom: $bdu * 2;
    height: 48px;
  }
}
</style>
