<template>
  <ReBottomSheet class-sheet="calendar-modal">
    <ReButton class="calendar-modal__button" modifier="cta-uva">
      {{ $t("signup.calendarStep.cta") }}
    </ReButton>
  </ReBottomSheet>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReBottomSheet from "@/components/ReBottomSheet/ReBottomSheet.vue";
import ReButton from "@/components/ReButton/ReButton.vue";

const CalendarStep = defineComponent({
  components: {
    ReBottomSheet,
    ReButton,
  },
});
export default CalendarStep;
</script>

<style lang="scss">
@import "~@/assets/styles/variables";
@import "~@/assets/styles/mixins";

.calendar-modal {
  &__tips {
    background-color: $white;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    color: $grape;
    font-size: 14px;
    text-align: left;
    padding: $bdu * 3;
    margin-bottom: $bdu * 8;
  }

  &__tips-title {
    font-weight: $font-weight-bold;
    margin: 0 0 $bdu * 2;
  }

  &__tips-description {
    margin-bottom: 2 * $bdu;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
