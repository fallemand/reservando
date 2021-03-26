<template>
  <div class="name-step">
    <p class="name-step__intro signup__intro">{{ $t("signup.nameStep.question") }}</p>
    <ReInput class="name-step__field" :placeholder="$t('signup.nameStep.inputPlaceholder')" />
    <ReButton class="name-step__button" @click="$router.push('calendar')">
      {{ $t("signup.continue") }}
    </ReButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReInput, ReButton } from "@reservando/design-system";

const NameStep = defineComponent({
  components: {
    ReInput,
    ReButton,
  },
});
export default NameStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.name-step {
  &__field {
    margin-bottom: $bdu * 8;
    font-size: 32px;
    letter-spacing: -1px;
    font-weight: 600;
    text-align: center;
  }
}
</style>
