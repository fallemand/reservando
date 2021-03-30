<template>
  <div class="calendar-time">
    <h3 class="calendar-time__title">Fin de la semana</h3>
    <p class="calendar-time__label">HORARIOS:</p>
    <p class="calendar-time__value">10:00hs a 13: 00hs</p>
    <p class="calendar-time__label">DÍAS:</p>
    <p class="calendar-time__value">Domingo - Jueves - Viernes - Sabado</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const CalendarTime = defineComponent({
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
  background-color: $white;
  border-radius: $bdu;
  text-align: left;
  padding: ($bdu * 2) ($bdu * 2.5);
  box-shadow: 0px 0px 1px rgba(0, 50, 77, 0.1), 0px 0px 2px rgba(0, 50, 77, 0.09),
    0px 4px 16px rgba(0, 50, 77, 0.1);
  border-left: 4px solid $primary-500;

  &__title {
    color: $primary-500;
    font-size: 18px;
  }

  &__label {
    text-transform: uppercase;
    color: $text-secondary;
    margin-top: $bdu * 2;
    margin-bottom: $bdu;
  }

  &__value {
  }
}
</style>
