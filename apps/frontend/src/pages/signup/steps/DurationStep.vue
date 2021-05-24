<template>
  <div class="duration-step">
    <p class="signup__intro">{{ $t("signup.durationStep.intro") }}</p>
    <ReFormField :error="isSubmitted && !state.duration && $t('general.validation.required')">
      <ReCheckboxGroup
        :checked="[state.duration]"
        class="duration-step__intervals"
        @update:checked="handleChangeDuration"
      >
        <ReCheckbox
          v-for="duration in validDurations"
          :id="duration"
          :key="duration"
          modifier="contained"
          class="duration-step__interval"
          :label="$t('signup.durationStep.label', [duration])"
        />
      </ReCheckboxGroup>
    </ReFormField>
    <p class="signup__hint duration-step__hint">
      {{ $t("signup.durationStep.hint", [state.duration]) }}
    </p>
    <ContinueButton @click="handleContinue">
      {{ $t("signup.continue") }}
    </ContinueButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ReCheckboxGroup, ReCheckbox, ReFormField } from "@reservando/design-system";
import { useRouter } from "vue-router";
import { Time } from "@reservando/commons/types";
import ContinueButton from "../components/ContinueButton.vue";
import { useStore } from "../store";

export default defineComponent({
  name: "DurationStep",
  components: {
    ContinueButton,
    ReCheckboxGroup,
    ReCheckbox,
    ReFormField,
  },
  setup() {
    const store = useStore();
    const isSubmitted = ref(false);
    const router = useRouter();
    const validDurations: Time.Duration[] = [30, 60, 90, 120];

    const handleChangeDuration = (duration: Time.Duration[]) => {
      store.dispatch("setDuration", duration.pop());
    };

    const handleContinue = () => {
      if (store.state.interval) {
        router.push("sectors");
      } else {
        isSubmitted.value = true;
      }
    };

    return {
      state: store.state,
      isSubmitted,
      validDurations,
      handleChangeDuration,
      handleContinue,
    };
  },
});
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.duration-step {
  &__interval {
    margin-bottom: $bdu;
  }

  &__hint {
    margin-top: $bdu * 2.5;
  }
}
</style>
