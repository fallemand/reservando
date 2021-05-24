<template>
  <div class="interval-step">
    <p class="signup__intro">{{ $t("signup.intervalStep.intro") }}</p>
    <ReFormField :error="isSubmitted && !state.interval && $t('general.validation.required')">
      <ReCheckboxGroup
        :checked="[state.interval]"
        class="interval-step__intervals"
        @update:checked="handleChangeInterval"
      >
        <ReCheckbox
          v-for="interval in validIntervals"
          :id="interval"
          :key="interval"
          modifier="contained"
          class="interval-step__interval"
          :label="$t('signup.intervalStep.intervalLabel', [interval])"
        />
      </ReCheckboxGroup>
    </ReFormField>
    <p class="signup__hint interval-step__hint">
      {{
        $t("signup.intervalStep.hint", [
          exampleTimes[0],
          exampleTimes[1],
          exampleTimes[2],
          exampleTimes[3],
        ])
      }}
    </p>
    <ContinueButton @click="handleContinue">
      {{ $t("signup.continue") }}
    </ContinueButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { ReCheckboxGroup, ReCheckbox, ReFormField } from "@reservando/design-system";
import { useRouter } from "vue-router";
import { Time } from "@reservando/commons/types";
import ContinueButton from "../components/ContinueButton.vue";
import { useStore } from "../store";

export default defineComponent({
  name: "IntervalStep",
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
    const validIntervals: Time.Interval[] = [15, 30, 45, 60];

    // Calculate example times
    const exampleTimes = computed<Time.Time[]>(() => {
      let examples: Time.Time[] = [];
      let hour = 20;
      let minute = 0;
      do {
        const example = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}` as Time.Time;
        examples.push(example);
        minute = minute + store.state.interval;
        if (minute >= 60) {
          minute = minute - 60;
          hour += 1;
        }
      } while (examples.length < 4);
      return examples;
    });

    const handleChangeInterval = (interval: Time.Interval[]) => {
      store.dispatch("setInterval", interval.pop());
    };

    const handleContinue = () => {
      if (store.state.interval) {
        router.push("duration");
      } else {
        isSubmitted.value = true;
      }
    };

    return {
      state: store.state,
      exampleTimes,
      isSubmitted,
      validIntervals,
      handleChangeInterval,
      handleContinue,
    };
  },
});
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.interval-step {
  &__interval {
    margin-bottom: $bdu;
  }

  &__hint {
    margin-top: $bdu * 2.5;
  }
}
</style>
