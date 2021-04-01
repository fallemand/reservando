<template>
  <ReButton class="google-button" size="large" v-bind="$attrs">
    <template #icon>
      <ReIcon class="google-button__icon" :name="$icons.google" />
    </template>
    <slot />
  </ReButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReButton, ReIcon } from "@reservando/design-system";

const GoogleButton = defineComponent({
  components: {
    ReButton,
  },
});
export default GoogleButton;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";

.google-button {
  $base-color: $white;
  color: $grey-800;
  background-color: $base-color;
  box-shadow: 0px 0px 1px rgba(0, 50, 77, 0.1), 0px 0px 2px rgba(0, 50, 77, 0.13), 0px 1px 4px rgba(0, 50, 77, 0.1);

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
