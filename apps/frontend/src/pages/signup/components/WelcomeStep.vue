<template>
  <div class="welcome-step">
    <p class="welcome-step__intro">{{ $t("signup.welcomeStep.intro") }}</p>
    <img class="welcome-step__logo" :src="logoSvg" alt="Reservando" />
    <p class="welcome-step__description">
      {{ $t("signup.welcomeStep.description") }}
    </p>
    <a class="welcome-step__cta">
      {{ $t("signup.welcomeStep.cta") }}
    </a>
    <img class="welcome-step__image" :src="tableSvg" alt="Dinner table" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import tableSvg from "@/assets/images/table.svg";
import logoSvg from "@/assets/images/logo.svg";

const Page = defineComponent({
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
export default Page;
</script>

<style lang="scss">
@import "~@/assets/styles/variables";
@import "~@/assets/styles/mixins";

.welcome-step {
  &__intro {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: $bdu * 2;
  }

  &__logo {
    max-width: 300px;
    margin-bottom: $bdu * 3;
  }

  &__description {
    font-size: 18px;
    margin-bottom: $bdu * 7;
  }

  &__cta {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: $bdu * 6;
    color: $red-link;
    display: block;
  }

  &__image {
    max-width: 100%;
  }
}
</style>
