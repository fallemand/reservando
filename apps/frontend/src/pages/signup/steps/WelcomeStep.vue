<template>
  <div class="welcome-step">
    <p class="signup__hint">{{ $t("signup.welcomeStep.intro") }}</p>
    <img class="welcome-step__logo" :src="logoSvg" alt="Reservando" />
    <p class="welcome-step__description">
      {{ $t("signup.welcomeStep.description") }}
    </p>
    <router-link class="welcome-step__cta" to="/name">
      {{ $t("signup.welcomeStep.cta") }}
    </router-link>
    <img class="welcome-step__image" :src="tableSvg" alt="Dinner table" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import tableSvg from "@/assets/images/table.svg";
import logoSvg from "@reservando/design-system/images/logo.svg";

const WelcomeHeader = defineComponent({
  props: {},
  computed: {
    tableSvg(): string {
      return tableSvg;
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
  text-align: center;

  &__logo {
    max-width: 300px;
    width: 100%;
    margin-bottom: $bdu * 3;
  }

  &__description {
    @extend .re-body-18;
    margin-bottom: $bdu * 7;
  }

  &__cta {
    @extend .re-body-strong-16;
    margin-bottom: $bdu * 6;
    color: $btn-primary;
    text-decoration: none;
    display: block;
  }

  &__image {
    max-width: 100%;
  }
}
</style>
