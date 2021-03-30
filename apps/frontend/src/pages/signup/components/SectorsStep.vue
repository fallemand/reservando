<template>
  <div class="sectors-step">
    <p class="sectors-step__intro signup__intro">{{ $t("signup.sectorStep.intro") }}</p>
    <ReInput class="sectors-step__field" :placeholder="$t('signup.nameStep.inputPlaceholder')" />
    <ReButton class="sectors-step__button" size="large" @click="$router.push('calendar')">
      {{ $t("signup.continue") }}
    </ReButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReInput, ReButton } from "@reservando/design-system";

const SectorsStep = defineComponent({
  components: {
    ReInput,
    ReButton,
  },
});
export default SectorsStep;
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
