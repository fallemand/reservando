<template>
  <div class="typography">
    <h1 class="re-big-title-64">64pt Montserrat bold</h1>
    <h2 class="re-big-title-56">56pt Montserrat bold</h2>
    <h3 class="re-big-title-48">48pt Montserrat bold</h3>
    <h4 class="re-big-title-40">40pt Montserrat bold</h4>

    <hr class="typography__divider" />

    <h1 class="re-title-32">Title 32px Montserrat semibold</h1>
    <h2 class="re-title-28">Title 28px Montserrat semibold</h2>
    <h3 class="re-title-24">Title 24px Montserrat semibold</h3>
    <h4 class="re-title-20">Title 20px Montserrat semibold</h4>

    <hr class="typography__divider" />

    <p class="re-body-strong-18">Body Strong 18pt Montserrat Medium</p>
    <p class="re-body-strong-16">Body Strong 16pt Montserrat Medium</p>
    <p class="re-body-strong-14">Body Strong 14pt Montserrat Medium</p>

    <hr class="typography__divider" />

    <p class="re-body-18">Body Strong 18pt Montserrat Regular</p>
    <p class="re-body-16">Body Strong 16pt Montserrat Regular</p>
    <p class="re-body-14">Body Strong 14pt Montserrat Regular</p>

    <hr class="typography__divider" />

    <p class="re-caption-up">Caption 12pt Montserrat Regular</p>
    <p class="re-caption">Caption 12pt Montserrat Regular</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const Typography = defineComponent({
  name: "Typography",
});

export default Typography;
</script>

<style lang="scss">
@import "@reservando/design-system/styles/variables";

.typography {
  > * {
    margin: ($bdu * 1.5) 0;
  }

  &__divider {
    margin: $bdu * 3 0;
    background-color: $grey-300;
    height: 1px;
    border: 0;
  }
}
</style>
