<template>
  <div class="name-step">
    <p class="name-step__intro signup__intro">{{ $t("signup.nameStep.question") }}</p>
    <ReInput
      class="name-step__field"
      modifier="underline"
      :modelValue="state.name"
      :placeholder="$t('signup.nameStep.inputPlaceholder')"
      @update:modelValue="(value) => $store.dispatch('setName', value)"
    />
    <ContinueButton @click="$router.push('calendar')">
      {{ $t("signup.continue") }}
    </ContinueButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReInput, ReButton } from "@reservando/design-system";
import ContinueButton from "../components/ContinueButton.vue";
import { useStore } from '../store';

const NameStep = defineComponent({
  components: {
    ReInput,
    ReButton,
    ContinueButton
  },
  setup() {
    const store = useStore();
    const changeName = (name: string) => {
      store.dispatch("setName", name);
    };

    return {
      state: store.state,
      changeName,
    }
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
    @extend .re-title-32
  }
}
</style>
