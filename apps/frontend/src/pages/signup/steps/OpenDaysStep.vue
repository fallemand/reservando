<template>
  <div class="days-step">
    <p class="signup__intro">{{ $t("signup.openDaysStep.intro") }}</p>
    <ReFormField
      :error="
        isSubmitted && !state.calendar.openingTimes.length && $t('general.validation.required')
      "
    >
      <ReCheckboxGroup
        :checked="state.calendar.openingTimes"
        class="days-step__days"
        @update:checked="handleChangeDays"
      >
        <ReCheckbox id="monday" modifier="contained" :label="$t('general.weekdays.monday')" />
        <ReCheckbox id="tuesday" modifier="contained" :label="$t('general.weekdays.tuesday')" />
        <ReCheckbox id="wednesday" modifier="contained" :label="$t('general.weekdays.wednesday')" />
        <ReCheckbox id="thursday" modifier="contained" :label="$t('general.weekdays.thursday')" />
        <ReCheckbox id="friday" modifier="contained" :label="$t('general.weekdays.friday')" />
        <ReCheckbox id="saturday" modifier="contained" :label="$t('general.weekdays.saturday')" />
        <ReCheckbox id="sunday" modifier="contained" :label="$t('general.weekdays.sunday')" />
      </ReCheckboxGroup>
    </ReFormField>
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

const CalendarStep = defineComponent({
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

    const handleChangeDays = (days: Time.DayName[]) => {
      store.dispatch("setOpeningTimes", days);
    };

    const handleContinue = () => {
      if (store.state.calendar.openingTimes.length) {
        router.push("congrats");
      } else {
        isSubmitted.value = true;
      }
    };

    return {
      state: store.state,
      isSubmitted,
      handleChangeDays,
      handleContinue,
    };
  },
});
export default CalendarStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.days-step {
  &__days {
    .re-checkbox {
      margin-bottom: $bdu;
    }
  }
}
</style>
