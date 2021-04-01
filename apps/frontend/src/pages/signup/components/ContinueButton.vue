<template>
  <div class="continue-button" :class="$attrs.class">
    <ReButton class="continue-button__continue" size="large" v-bind="$attrs">
      <slot />
    </ReButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReButton } from "@reservando/design-system";

const ContinueButton = defineComponent({
  inheritAttrs: false,
  components: {
    ReButton,
  },
});
export default ContinueButton;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";

.continue-button {
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  &__continue {
    margin-bottom: $bdu * 4;
  }
}
</style>
