<template>
  <component
    :is="renderAsLink($attrs) ? 'a' : 'button'"
    :class="[
      're-button',
      `re-button-${size}`,
      `re-button-${modifier}`,
      { 're-button-with-icon': $slots.icon },
    ]"
    v-bind="$attrs"
    :type="renderAsLink($attrs) ? null : type"
  >
    <span v-if="$slots.icon" class="re-button-icon">
      <!-- @slot Icon at the beginning of the button -->
      <slot name="icon" />
    </span>

    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export const TYPES = ["button", "submit", "reset"];
export const SIZES = ["xsmall", "small", "medium", "large"];
export const MODIFIERS = ["cta-uva", "cta-red", "outline-uva"];

const ReButton = defineComponent({
  name: "ReButton",
  props: {
    size: {
      default: "medium",
      type: String as PropType<typeof SIZES[number]>,
      validator: (value: string): boolean => SIZES.includes(value),
    },
    modifier: {
      default: "cta-red",
      type: String as PropType<typeof MODIFIERS[number]>,
      validator: (value: string): boolean => MODIFIERS.includes(value),
    },
    type: {
      default: "button",
      type: String as PropType<typeof TYPES[number]>,
      validator: (value: string): boolean => TYPES.includes(value),
    },
  },
  methods: {
    renderAsLink(attrs?: { href: string }): boolean {
      return !!attrs && !!attrs.href;
    },
  },
});

export default ReButton;
</script>

<style lang="scss" src="./ReButton.scss" />
