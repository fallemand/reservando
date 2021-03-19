<template>
  <transition :appear="true" :name="`re-transition-${transition}`" v-bind="$attrs">
    <slot />
  </transition>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

/**
 * This is a functional component that will animate the transitions of any content. <br />
 * It just wraps the content in a `<transition />`, adds styles and calculates
 * automatically the heights if requested.
 */
const ReTransition = defineComponent({
  name: "ReTransition",
  props: {
    transition: {
      type: String as PropType<"fade" | "expand" | "height" | "slide-right" | "slide-bottom">,
      default: "fade",
    },
  },
});

export default ReTransition;
</script>

<style lang="scss" src="./ReTransition.scss" />
