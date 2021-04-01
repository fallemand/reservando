<template>
  <div class="sectors-step">
    <p class="sectors-step__intro signup__intro">{{ $t("signup.sectorsStep.question") }}</p>
    <SectorCard class="sectors-step__sector" :label="$t('signup.sectorsStep.inside')" />
    <SectorCard class="sectors-step__sector" :label="$t('signup.sectorsStep.outside')" />
    <ContinueButton class="sectors-step__continue" @click="$router.push('register')">
      {{ $t("controls.continue") }}
    </ContinueButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReButton } from "@reservando/design-system";
import SectorCard from "../components/SectorCard.vue";
import ContinueButton from "../components/ContinueButton.vue";

const RegisterStep = defineComponent({
  components: {
    SectorCard,
    ReButton,
    ContinueButton,
  },
});
export default RegisterStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.sectors-step {
  &__sector {
    margin-bottom: $bdu * 2;
  }
}
</style>
