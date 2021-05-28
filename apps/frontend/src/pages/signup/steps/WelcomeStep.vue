<template>
  <div class="welcome-step">
    <p class="welcome-step__hint signup__hint">{{ $t("signup.welcomeStep.intro") }}</p>
    <img class="welcome-step__logo" :src="logoSvg" alt="Reservando" />
    <p class="welcome-step__description">
      {{ $t("signup.welcomeStep.description") }}
    </p>
    <ReButton @click="$router.push('name')">
      {{ $t("signup.welcomeStep.cta") }}
    </ReButton>
    <div class="welcome-step__image-container">
      <img class="welcome-step__image" :src="welcomeImage" alt="Reservando demo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReButton } from "@reservando/design-system";
import welcomeImage from "@/assets/images/signup-welcome.png";
import logoSvg from "@reservando/design-system/images/logo.svg";

const WelcomeHeader = defineComponent({
  components: { ReButton },
  computed: {
    welcomeImage(): string {
      return welcomeImage;
    },
    logoSvg(): string {
      return logoSvg;
    },
  },
  methods: {
    setTitle(): void {},
  },
});
export default WelcomeHeader;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.welcome-step {
  background-color: $primary-100;
  top: 0;
  display: block;
  padding-top: $bdu * 8;

  &__hint {
    @extend .re-caption-up;
  }

  &__logo {
    max-width: 260px;
    width: 100%;
    margin-bottom: $bdu * 3;
  }

  &__description {
    @extend .re-body-16;
    margin-bottom: $bdu * 4;
  }

  &__image-container {
    text-align: right;
  }
  &__image {
    margin-right: -$bdu;
  }
}
</style>
