<template>
  <transition
    :appear="true"
    :name="`re-transition-${name}`"
    :mode="$attrs.mode"
    v-bind="{
      ...heightTransition,
    }"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { heightTransition } from "./transitions";

/**
 * This is a functional component that will animate the transitions of any content. <br />
 * It just wraps the content in a `<transition />`, adds styles and calculates
 * automatically the heights if requested.
 */
const ReTransition = defineComponent({
  name: "ReTransition",
  inheritAttrs: false,
  props: {
    name: {
      type: String as PropType<"fade" | "expand" | "height" | "slide-right" | "slide-bottom">,
      default: "fade",
    },
    /** Pass true if you are transitioning a list with v-for */
    group: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    heightTransition() {
      return this.name === "height" ? heightTransition : {};
    },
  },
});

export default ReTransition;
</script>

<style lang="scss" src="./ReTransition.scss" />
