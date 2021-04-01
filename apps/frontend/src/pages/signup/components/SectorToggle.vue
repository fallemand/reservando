<template>
  <div class="sectors-toggle">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReInput, ReButton } from "@reservando/design-system";

const RegisterStep = defineComponent({
  components: {
    ReInput,
    ReButton,
  },
});
export default RegisterStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.sectors-step {
  &__field {
    margin-bottom: $bdu * 8;
    font-size: 32px;
    letter-spacing: -1px;
    font-weight: 600;
    text-align: center;
  }
}
</style>
