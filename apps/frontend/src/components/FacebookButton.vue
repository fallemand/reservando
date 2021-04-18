<template>
  <ReButton class="facebook-button" size="large" v-bind="$attrs">
    <template #icon>
      <ReIcon class="facebook-button__icon" :name="$icons.facebook" />
    </template>
    <slot />
  </ReButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReButton } from "@reservando/design-system";

const FacebookButton = defineComponent({
  components: {
    ReButton,
  },
});
export default FacebookButton;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";

.facebook-button {
  $base-color: #41639d;
  background-color: $base-color;

  &:hover {
    background-color: darken($base-color, 10%);
  }

  &:active {
    background-color: darken($base-color, 20%);
  }

  &__icon {
    color: $white;
  }
}
</style>
