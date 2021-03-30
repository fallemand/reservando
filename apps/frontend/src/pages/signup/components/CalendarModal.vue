<template>
  <ReBottomSheet ref="bottomSheet" class-sheet="calendar-modal" @close="$emit('close')">
    <template #action>
      <ReButton class="calendar-modal__save" size="small" @click="handleSave">
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
    <ReButton class="calendar-modal__add-times" modifier="secondary-outline">
      {{ $t("signup.calendarStep.modal.addOpenHours") }}
    </ReButton>
    <hr class="calendar-modal__separator" />
    <p class="calendar-modal__label">
      {{ $t("signup.calendarStep.modal.repeat") }}
    </p>
    <ReCheckboxGroup v-model:checked="checkedDays">
      <ReCheckbox id="monday" modifier="full" :label="$t('general.days.monday')" />
      <ReCheckbox id="tuesday" modifier="full" :label="$t('general.days.tuesday')" />
      <ReCheckbox id="wednesday" modifier="full" :label="$t('general.days.wednesday')" />
      <ReCheckbox id="thursday" modifier="full" :label="$t('general.days.thursday')" />
      <ReCheckbox id="friday" modifier="full" :label="$t('general.days.friday')" />
      <ReCheckbox id="saturday" modifier="full" :label="$t('general.days.saturday')" />
      <ReCheckbox id="sunday" modifier="full" :label="$t('general.days.sunday')" />
    </ReCheckboxGroup>
  </ReBottomSheet>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  ReBottomSheet,
  ReButton,
  ReInput,
  ReCheckbox,
  ReCheckboxGroup,
} from "@reservando/design-system";
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
  methods: {
    handleSave(): void {
      this.$emit("add-calendar");
      this.$refs.bottomSheet.close();
    },
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
}
</style>
