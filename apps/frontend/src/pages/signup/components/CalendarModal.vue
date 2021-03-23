<template>
  <ReBottomSheet class-sheet="calendar-modal" @close="$emit('close')">
    <template #action>
      <ReButton class="calendar-modal__save" modifier="cta-uva" size="small">
        {{ $t("controls.save") }}
      </ReButton>
    </template>
    <ReInput
      class="calendar-modal__input"
      :placeholder="$t('signup.calendarStep.modal.titlePlaceholder')"
    />
    <p class="calendar-modal__label">{{ $t("signup.calendarStep.modal.openHours") }}</p>
    <CalendarTimeSelector
      id="from"
      v-model="timeFrom"
      class="calendar-modal__time-selector"
      :label="`${$t('controls.from')}:`"
    />
    <CalendarTimeSelector
      id="to"
      v-model="timeTo"
      class="calendar-modal__time-selector"
      :label="`${$t('controls.to')}:`"
    />
    <ReButton class="calendar-modal__add-times" modifier="outline-uva">
      {{ $t("signup.calendarStep.modal.addOpenHours") }}
    </ReButton>
    <hr class="calendar-modal__separator" />
    <p class="calendar-modal__label">
      {{ $t("signup.calendarStep.modal.repeat") }}
    </p>
    <ReCheckboxGroup v-model:checked="checkedDays">
      <ReCheckbox id="sunday" modifier="full" label="Domingo" />
      <ReCheckbox id="monday" modifier="full" label="Lunes" />
    </ReCheckboxGroup>
  </ReBottomSheet>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReBottomSheet from "@/components/ReBottomSheet/ReBottomSheet.vue";
import ReButton from "@/components/ReButton/ReButton.vue";
import ReInput from "@/components/ReInput/ReInput.vue";
import ReCheckbox from "@/components/ReCheckbox/ReCheckbox.vue";
import ReCheckboxGroup from "@/components/ReCheckboxGroup/ReCheckboxGroup.vue";
import CalendarTimeSelector from "./CalendarTimeSelector.vue";

const CalendarStep = defineComponent({
  components: {
    ReBottomSheet,
    ReButton,
    ReInput,
    ReCheckbox,
    ReCheckboxGroup,
    CalendarTimeSelector,
  },
  data() {
    return {
      checkedDays: ["sunday"],
      wednesday: false,
      timeFrom: "20:00",
      timeTo: "00:00",
    };
  },
});
export default CalendarStep;
</script>

<style lang="scss">
@import "~@/assets/styles/variables";
@import "~@/assets/styles/mixins";

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
}
</style>
