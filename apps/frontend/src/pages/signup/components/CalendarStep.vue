<template>
  <div class="calendar-step">
    <p class="calendar-step__intro signup__intro">{{ $t("signup.calendarStep.question") }}</p>
    <div class="calendar-step__tips">
      <h3 class="calendar-step__tips-title">
        {{ $t("signup.calendarStep.tips.title") }}
      </h3>
      <p class="calendar-step__tips-description">
        {{ $t("signup.calendarStep.tips.description1") }}
      </p>
      <p class="calendar-step__tips-description">
        {{ $t("signup.calendarStep.tips.description2") }}
      </p>
      <p class="calendar-step__tips-description">
        {{ $t("signup.calendarStep.tips.description3") }}
      </p>
    </div>
    <ReButton class="calendar-step__button" modifier="cta-uva" @click="showModal = true">
      {{ $t("signup.calendarStep.cta") }}
    </ReButton>
    <CalendarModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReButton from "@/components/ReButton/ReButton.vue";
import CalendarModal from "./CalendarModal.vue";

const CalendarStep = defineComponent({
  components: {
    ReButton,
    CalendarModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
});
export default CalendarStep;
</script>

<style lang="scss">
@import "~@/assets/styles/variables";
@import "~@/assets/styles/mixins";

.calendar-step {
  &__tips {
    background-color: $white;
    border: 1px solid $border-secondary;
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
