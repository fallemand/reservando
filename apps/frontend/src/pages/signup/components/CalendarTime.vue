<template>
  <ReCard class="calendar-time">
    <h3 class="calendar-time__title">Fin de la semana</h3>
    <p class="calendar-time__label">HORARIOS:</p>
    <p class="calendar-time__value">10:00hs a 13: 00hs</p>
    <p class="calendar-time__label">DÍAS:</p>
    <p class="calendar-time__value">Domingo - Jueves - Viernes - Sabado</p>
    <ReButton class="calendar-time__edit" modifier="secondary">{{ $t("controls.edit") }}</ReButton>
  </ReCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReCard, ReButton } from "@reservando/design-system";

const CalendarTime = defineComponent({
  components: { ReCard, ReButton },
  data() {
    return {
      checkedDays: ["sunday"],
      wednesday: false,
      timeFrom: "20:00",
      timeTo: "00:00",
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
