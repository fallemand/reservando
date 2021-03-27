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

export enum ReButtonType {
  button = "button",
  submit = "submit",
  reset = "reset",
}
export enum ReButtonSize {
  xsmall = "xsmall",
  small = "small",
  medium = "medium",
  large = "large",
}
export enum ReButtonModifier {
  "cta-uva" = "cta-uva",
  "cta-red" = "cta-red",
  "outline-uva" = "outline-uva",
}
export const MODIFIERS = ["cta-uva", "cta-red", "outline-uva"];

const ReButton = defineComponent({
  name: "ReButton",
  props: {
    /** One of: `xsmall` `small` `medium` `large` */
    size: {
      default: "medium",
      type: String as PropType<ReButtonSize>,
      validator: (value: string): boolean =>
        Object.values(ReButtonSize).includes(value as ReButtonSize),
    },
    /** One of: `cta-red` `cta-uva` `outline-uva` */
    modifier: {
      default: "cta-red",
      type: String as PropType<ReButtonModifier>,
      validator: (value: string): boolean =>
        Object.values(ReButtonModifier).includes(value as ReButtonModifier),
    },
    /** One of: `button` `submit` `reset` */
    type: {
      default: "button",
      type: String as PropType<ReButtonType>,
      validator: (value: string): boolean =>
        Object.values(ReButtonType).includes(value as ReButtonType),
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
