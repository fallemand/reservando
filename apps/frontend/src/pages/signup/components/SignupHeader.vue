<template>
  <div class="signup-header" :class="{ 'signup-header--highlight': highlight }">
    <a class="signup-header__back" @click="handleBack">
      <ReIcon class="signup-header__back-img" :name="$icons.arrowLeft" />
    </a>
    <div class="signup-header__logo">
      <img class="signup-header__logo-img" :src="logoSvg" alt="Reservando" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logoSvg from "@reservando/design-system/images/logo.svg";

const Page = defineComponent({
  props: {
    highlight: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    logoSvg(): string {
      return logoSvg;
    },
  },
  methods: {
    handleBack(): void {
      this.$router.back();
    },
  },
});
export default Page;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.signup-header {
  display: flex;
  align-items: center;
  padding: $bdu * 2;

  &--highlight {
    background-color: $primary-100;
  }

  &__back {
    flex-shrink: 0;
    color: $btn-primary;
  }

  &__back-img {
    font-size: 24px;
    color: $btn-primary;
  }

  &__logo {
    flex: 1;
    text-align: center;
  }

  &__logo-img {
    width: 130px;
  }
}
</style>
