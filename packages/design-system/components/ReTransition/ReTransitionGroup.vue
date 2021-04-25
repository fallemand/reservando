<template>
  <transition-group :appear="true" name="re-transition-height" v-bind="heightTransition">
    <slot />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { heightTransition } from "./transitions";

/**
 * Use it to animate when looping over a list with v-for. <br />
 * It just wraps the content in a `<transition-group />`, adds styles and calculates
 * automatically the heights if requested.
 */
const ReTransition = defineComponent({
  name: "ReTransition",
  inheritAttrs: false,
  computed: {
    heightTransition() {
      return heightTransition;
    },
  },
});

export default ReTransition;
</script>

<style lang="scss" src="./ReTransition.scss" />
