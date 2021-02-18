<template>
  <div class="welcome-step">
    <p class="welcome-step__intro">Bienvenido a</p>
    <img class="welcome-step__logo" :src="logoSvg" alt="Reservando" />
    <p class="welcome-step__description">
      Ahorramos tu tiempo de gestionar reservas, así podes enfocarte en lo importante.
    </p>
    <a class="welcome-step__cta">Toca la pantalla para comenzar</a>
    <img :src="tableSvg" alt="Dinner table" />
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
</style>
