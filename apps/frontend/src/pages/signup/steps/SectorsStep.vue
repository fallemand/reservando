<template>
  <div class="sectors-step">
    <p class="sectors-step__intro signup__intro">{{ $t("signup.sectorsStep.question") }}</p>
    <SectorCard
      :sector="state.sectors.inside"
      class="sectors-step__sector"
      :label="$t('signup.sectorsStep.inside')"
      @change="updateSector"
    />
    <SectorCard
      class="sectors-step__sector"
      :sector="state.sectors.outside"
      :label="$t('signup.sectorsStep.outside')"
      @change="updateSector"
    />
    <ContinueButton class="sectors-step__continue" @click="$router.push('register')">
      {{ $t("controls.continue") }}
    </ContinueButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SectorCard from "../components/SectorCard.vue";
import ContinueButton from "../components/ContinueButton.vue";
import { useStore } from "../store";
import { Sector } from "../types";

const RegisterStep = defineComponent({
  components: {
    SectorCard,
    ContinueButton,
  },
  setup() {
    const store = useStore();
    const state = store.state;

    const updateSector = (sector: Sector) => {
      store.dispatch("updateSector", sector);
    };

    return {
      state,
      updateSector,
    };
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
