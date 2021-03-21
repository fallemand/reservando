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
    <div class="time-selector calendar-modal__time-selector">
      <label class="time-selector__label" for="from">{{ $t("controls.from") }}:</label>
      <ReInput id="from" class="time-selector__input" modifier="outline" value="09:00 hs" />
    </div>
    <div class="time-selector calendar-modal__time-selector">
      <label class="time-selector__label" for="from">{{ $t("controls.to") }}:</label>
      <ReInput id="from" class="time-selector__input" modifier="outline" value="09:00 hs" />
    </div>
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

const CalendarStep = defineComponent({
  components: {
    ReBottomSheet,
    ReButton,
    ReInput,
    ReCheckbox,
    ReCheckboxGroup,
  },
  data() {
    return {
      checkedDays: ["sunday"],
      wednesday: false,
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

.time-selector {
  display: flex;
  width: 100%;
  align-items: center;
  &__label {
    flex-grow: 1;
    text-align: left;
    color: $text-secondary;
  }
  &__input {
    flex-shrink: 0;
    flex-basis: 40%;
  }
}
</style>
