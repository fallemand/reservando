<template>
  <div class="signup-header">
    <a class="signup-header__back" @click="handleBack">
      <Icon class="signup-header__back-img" :icon="$icons.arrowLeft" size="24px" />
    </a>
    <div class="signup-header__logo">
      <img class="signup-header__logo-img" :src="logoSvg" alt="Reservando" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logoSvg from "@/assets/images/logo.svg";

const Page = defineComponent({
  props: {},
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

  &__back {
    flex-shrink: 0;
    color: $red-link;
  }

  &__back-img {
    color: $red-link;
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
