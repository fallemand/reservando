<template>
  <button
    :class="[
      're-button-round',
      `re-button-round--${size}`,
      `re-button-round--${modifier}`,
    ]"
    type="button"
  >
    <ReIcon :name="icon" />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ReIcon from "../ReIcon/ReIcon.vue";

export enum ReButtonRoundSize {
  small = "small",
  medium = "medium",
  large = "large",
}
export enum ReButtonRoundModifier {
  primary = "primary",
  secondary = "secondary",
}

const ReButtonRound = defineComponent({
  components: { ReIcon },
  name: "ReButtonRound",
  props: {
    size: {
      default: "medium",
      type: String as PropType<ReButtonRoundSize>,
      validator: (value: string): boolean =>
        Object.values(ReButtonRoundSize).includes(value as ReButtonRoundSize),
    },
    modifier: {
      default: "primary",
      type: String as PropType<ReButtonRoundModifier>,
      validator: (value: string): boolean =>
        Object.values(ReButtonRoundModifier).includes(value as ReButtonRoundModifier),
    },
    icon: {
      required: true,
      type: String,
    },
  },
});

export default ReButtonRound;
</script>

<style lang="scss" src="./ReButtonRound.scss" />
