<template>
  <span :style="{ width: size, height: size }" class="icon">
    <img class="icon__image" :src="icon" alt="icon" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const Icon = defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "16px",
    },
  },
});
export default Icon;
</script>

<style lang="scss">
@import "../../styles/variables";

.icon {
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
