<template>
  <ReCard class="calendar-time">
    <h3 class="calendar-time__title">
      {{ calendar.name }}
    </h3>
    <p class="calendar-time__label">HORARIOS:</p>
    <p
      v-for="(openingTime, index) in calendar.openingTimes"
      :key="index"
      class="calendar-time__value"
    >
      {{ openingTime.from }} a {{ openingTime.to }}
    </p>
    <p class="calendar-time__label">DÍAS:</p>
    <p class="calendar-time__value">
      {{ calendar.days.join(", ") }}
    </p>
    <ReButton class="calendar-time__edit" modifier="secondary">{{ $t("controls.edit") }}</ReButton>
  </ReCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ReCard, ReButton } from "@reservando/design-system";
import { Calendar } from "../types";

const CalendarTime = defineComponent({
  components: { ReCard, ReButton },
  props: {
    calendar: {
      required: true,
      type: Object as PropType<Calendar>,
    },
  },
});
export default CalendarTime;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.calendar-time {
  &__title {
    color: $primary-700;
    @extend .re-title-20;
  }

  &__label {
    @extend .re-caption-up;
    color: $text-secondary;
    margin-top: $bdu * 2;
    margin-bottom: $bdu;
  }

  &__label {
    @extend .re-body-14;
  }

  &__edit {
    margin-top: $bdu * 2;
  }
}
</style>
