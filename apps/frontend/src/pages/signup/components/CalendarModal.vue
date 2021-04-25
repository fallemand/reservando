<template>
  <ReBottomSheet ref="bottomSheet" class-sheet="calendar-modal" @close="$emit('close')">
    <template #action>
      <ReButton class="calendar-modal__save" size="small" @click="handleSave">
        {{ $t("controls.save") }}
      </ReButton>
    </template>
    <form novalidate @submit="handleSave">
      <ReFormField :error="isSubmitted && !calendarValues.name && $t('general.validation.required')">
        <ReInput
          v-model="calendarValues.name"
          class="calendar-modal__input"
          modifier="underline"
          :placeholder="$t('signup.calendarStep.modal.titlePlaceholder')"
        />
      </ReFormField>
      <p class="calendar-modal__label">{{ $t("signup.calendarStep.modal.openHours") }}</p>
      <div
        v-for="(openingTime, index) in calendarValues.openingTimes"
        :key="index"
        class="calendar-modal__opening-times"
      >
        <CalendarTimeSelector
          :id="`from-${index}`"
          v-model="openingTime.from"
          class="calendar-modal__time-selector"
          :label="`${$t('controls.from')}:`"
        />
        <CalendarTimeSelector
          :id="`to-${index}`"
          v-model="openingTime.to"
          class="calendar-modal__time-selector"
          :label="`${$t('controls.to')}:`"
        />
      </div>
      <ReButton
        class="calendar-modal__add-times"
        modifier="secondary-outline"
        @click="addOpeningTime"
      >
        {{ $t("signup.calendarStep.modal.addOpenHours") }}
      </ReButton>
      <hr class="calendar-modal__separator" />
      <p class="calendar-modal__label">
        {{ $t("signup.calendarStep.modal.repeat") }}
      </p>
      <ReFormField
        :error="isSubmitted && !calendarValues.days.length && $t('general.validation.required')"
      >
        <ReCheckboxGroup v-model:checked="calendarValues.days" class="calendar-modal__days">
          <ReCheckbox id="monday" modifier="contained" :label="$t('general.weekdays.monday')" />
          <ReCheckbox id="tuesday" modifier="contained" :label="$t('general.weekdays.tuesday')" />
          <ReCheckbox
            id="wednesday"
            modifier="contained"
            :label="$t('general.weekdays.wednesday')"
          />
          <ReCheckbox id="thursday" modifier="contained" :label="$t('general.weekdays.thursday')" />
          <ReCheckbox id="friday" modifier="contained" :label="$t('general.weekdays.friday')" />
          <ReCheckbox id="saturday" modifier="contained" :label="$t('general.weekdays.saturday')" />
          <ReCheckbox id="sunday" modifier="contained" :label="$t('general.weekdays.sunday')" />
        </ReCheckboxGroup>
      </ReFormField>
    </form>
  </ReBottomSheet>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import {
  ReBottomSheet,
  ReButton,
  ReInput,
  ReFormField,
  ReCheckbox,
  ReCheckboxGroup,
} from "@reservando/design-system";
import CalendarTimeSelector from "./CalendarTimeSelector.vue";
import { Calendar } from "../types";

const CalendarStep = defineComponent({
  components: {
    ReBottomSheet,
    ReButton,
    ReInput,
    ReFormField,
    ReCheckbox,
    ReCheckboxGroup,
    CalendarTimeSelector,
  },
  props: {
    calendar: {
      type: Object as PropType<Calendar>,
      required: true,
    },
  },
  setup(props, context) {
    const calendarValues = ref(props.calendar);
    const isSubmitted = ref(false);
    const bottomSheet = ref<{ close: () => void }>();

    const isValid = (): boolean => {
      isSubmitted.value = true;
      const { name, openingTimes, days } = calendarValues.value;
      return !!name && openingTimes.length > 0 && days.length > 0;
    };

    const handleSave = (): void => {
      if (isValid()) {
        context.emit("add-calendar", calendarValues.value);
        bottomSheet.value?.close();
      }
    };

    const addOpeningTime = (): void => {
      calendarValues.value.openingTimes.push({
        from: "08:00",
        to: "00:00",
      });
    };

    return {
      bottomSheet,
      calendarValues,
      isSubmitted,
      handleSave,
      addOpeningTime,
    };
  },
});
export default CalendarStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.calendar-modal {
  &__label {
    color: $text-highlight;
    font-weight: 500;
    text-align: left;
    margin: ($bdu * 3) 0;
  }
  &__input {
    text-align: left;
  }
  &__time-selector {
    margin-bottom: $bdu;
  }
  &__add-times {
    margin-top: $bdu * 3;
    width: 100%;
  }
  &__separator {
    color: $border-primary;
    margin: ($bdu * 4) 0;
  }
  &__days {
    .re-checkbox {
      margin-bottom: 0.5em;
    }
  }
}
</style>
