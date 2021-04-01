<template>
  <ReCard class="calendar-time">
    <h3 class="calendar-time__title">Fin de la semana</h3>
    <p class="calendar-time__label">HORARIOS:</p>
    <p class="calendar-time__value">10:00hs a 13: 00hs</p>
    <p class="calendar-time__label">DÍAS:</p>
    <p class="calendar-time__value">Domingo - Jueves - Viernes - Sabado</p>
  </ReCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReCard } from "@reservando/design-system";

const CalendarTime = defineComponent({
  components: { ReCard },
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
  text-align: left;
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
}
</style>
