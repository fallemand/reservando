<template>
  <span :style="{ width: size, height: size }" class="re-icon">
    <svg class="re-icon__image">
      <use v-bind="{ 'xlink:href': `${spriteUrl}#${name}` }" />
    </svg>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import spriteUrl from "./sprite.svg";

const ReIcon = defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "16px",
    },
  },
  computed: {
    spriteUrl(): string {
      return spriteUrl;
    },
  },
});

export default ReIcon;
</script>

<style lang="scss">
@import "../../styles/variables";

.re-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  &__image {
    height: 100%;
    width: 100%;
    fill: currentColor;
    display: inline-flex;
    align-items: center;
  }
}
</style>
