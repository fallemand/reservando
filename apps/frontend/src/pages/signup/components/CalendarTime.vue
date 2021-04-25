<template>
  <ReCard class="calendar-time">
    <h3 class="calendar-time__title">
      {{ calendar.name }}
    </h3>
    <p class="calendar-time__label">{{ $t("general.openingHours") }}:</p>
    <p
      v-for="(openingTime, index) in calendar.openingTimes"
      :key="index"
      class="calendar-time__value"
    >
      {{ openingTime.from }} a {{ openingTime.to }}
    </p>
    <p class="calendar-time__label">{{ $t("general.days") }}:</p>
    <p class="calendar-time__value">
      {{ calendar.days.map((day) => $t(`general.weekdays.${day}`)).join(", ") }}
    </p>
    <ReButton class="calendar-time__edit" modifier="secondary" @click="handleUpdate">
      {{ $t("controls.edit") }}
    </ReButton>
    <ReButton class="calendar-time__edit" modifier="link" @click="handleDelete">
      {{ $t("controls.delete") }}
    </ReButton>
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
  emits: ["update", "delete"],
  setup(props, context) {
    const handleUpdate = () => {
      context.emit("update", props.calendar);
    };
    const handleDelete = () => {
      context.emit("delete", props.calendar);
    };

    return {
      handleUpdate,
      handleDelete,
    };
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
    text-transform: uppercase;
    color: $text-secondary;
    margin-top: $bdu * 2;
    margin-bottom: $bdu;
  }

  &__label {
    @extend .re-body-14;
  }

  &__edit {
    margin-top: $bdu * 2;
    margin-right: $bdu * 2;
  }
}
</style>
