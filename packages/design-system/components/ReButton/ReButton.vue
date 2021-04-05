<template>
  <component
    :is="renderAsLink($attrs) ? 'a' : 'button'"
    :class="[
      're-button',
      `re-button--${size}`,
      `re-button--${modifier}`,
      { 're-button--with-icon': $slots.icon },
    ]"
    :type="renderAsLink($attrs) ? null : type"
  >
    <span v-if="$slots.icon" class="re-button-icon">
      <!-- @slot ReIcon at the beginning of the button -->
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
  small = "small",
  medium = "medium",
  large = "large",
}
export enum ReButtonModifier {
  primary = "primary",
  secondary = "secondary",
  "secondary-outline" = "secondary-outline",
  link = "link",
}

const ReButton = defineComponent({
  name: "ReButton",
  props: {
    size: {
      default: "medium",
      type: String as PropType<ReButtonSize>,
      validator: (value: string): boolean =>
        Object.values(ReButtonSize).includes(value as ReButtonSize),
    },
    modifier: {
      default: "primary",
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
