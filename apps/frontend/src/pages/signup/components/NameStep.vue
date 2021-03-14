<template>
  <div class="name-step">
    <p class="name-step__intro">{{ $t("signup.nameStep.question") }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import tableSvg from "@/assets/images/table.svg";
import logoSvg from "@/assets/images/logo.svg";

const NameStep = defineComponent({
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
export default NameStep;
</script>

<style lang="scss">
@import "~@/assets/styles/variables";
@import "~@/assets/styles/mixins";

.name-step {
  &__intro {
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
