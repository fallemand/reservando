<template>
  <div class="times-step">
    <p class="signup__intro">{{ $t("signup.openTimesStep.intro") }}</p>
    <div
      v-for="(openingTime, index) in openingTimes"
      :key="index"
      class="times-step__opening-times"
    >
      <CalendarTimeSelector
        :id="`from-${index}`"
        class="times-step__time-selector"
        :model-value="openingTime.from"
        :label="`${$t('controls.from')}:`"
        @update:modelValue="(value) => handleChangeFrom(index, value)"
      />
      <CalendarTimeSelector
        :id="`to-${index}`"
        :model-value="openingTime.to"
        class="times-step__time-selector"
        :label="`${$t('controls.to')}:`"
        @update:modelValue="(value) => handleChangeTo(index, value)"
      />
    </div>
    <ReButton class="times-step__add-times" modifier="secondary-outline" @click="addOpeningTime">
      {{ $t("signup.openTimesStep.addOpenHours") }}
    </ReButton>
    <p class="signup__hint times-step__hint">{{ $t("signup.openTimesStep.hint") }}</p>
    <ContinueButton @click="handleContinue">
      {{ $t("signup.continue") }}
    </ContinueButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { ReButton } from "@reservando/design-system";
import { Time } from "@reservando/commons/types";
import ContinueButton from "../components/ContinueButton.vue";
import { useStore } from "../store";
import CalendarTimeSelector from "../components/CalendarTimeSelector.vue";

export default defineComponent({
  name: "OpenTimesStep",
  components: {
    ContinueButton,
    ReButton,
    CalendarTimeSelector,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const openingTimes = store.state.calendar.openingTimes;

    const addOpeningTime = (): void => {
      openingTimes.push({
        from: "08:00",
        to: "00:00",
      });
      store.dispatch("setOpeningTimes", openingTimes);
    };

    const handleContinue = () => {
      router.push("interval");
    };
    const handleChangeFrom = (index: number, value: Time.Time) => {
      console.log(index, value);
      openingTimes[index].from = value;
      store.dispatch("setOpeningTimes", openingTimes);
    };
    const handleChangeTo = (index: number, value: Time.Time) => {
      openingTimes[index].to = value;
      console.log(index, value);
      store.dispatch("setOpeningTimes", openingTimes);
    };

    return {
      state: store.state,
      openingTimes,
      handleChangeFrom,
      handleChangeTo,
      addOpeningTime,
      handleContinue,
    };
  },
});
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.times-step {
  &__add-times {
    margin-top: $bdu * 2.5;
    width: 100%;
  }
  &__time-selector {
    margin-bottom: $bdu;
  }
  &__hint {
    margin-top: $bdu * 2.5;
  }
}
</style>
