<template>
  <div class="calendar-step">
    <template v-if="!calendarCreated">
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
      <ReButton class="calendar-step__button" size="large" @click="showModal = true">
        {{ $t("signup.calendarStep.ctaCreate") }}
      </ReButton>
    </template>
    <template v-else>
      <CalendarTime class="calendar-step__calendar-item" />
      <ReButton
        class="calendar-step__add-new"
        size="large"
        modifier="secondary-outline"
        @click="showModal = true"
      >
        {{ $t("signup.calendarStep.ctaAddNew") }}
      </ReButton>
      <div class="calendar-step__continue-container">
        <ReButton class="calendar-step__continue" size="large" @click="showModal = true">
          {{ $t("controls.continue") }}
        </ReButton>
      </div>
    </template>
    <CalendarModal
      v-if="showModal"
      @close="showModal = false"
      @add-calendar="calendarCreated = true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReButton } from "@reservando/design-system";
import CalendarModal from "./CalendarModal.vue";
import CalendarTime from "./CalendarTime.vue";

const CalendarStep = defineComponent({
  components: {
    ReButton,
    CalendarModal,
    CalendarTime,
  },
  data() {
    return {
      calendarCreated: false,
      showModal: false,
    };
  },
});
export default CalendarStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.calendar-step {
  display: flex;
  flex-direction: column;

  &__tips {
    background-color: $white;
    border: 1px solid $border-secondary;
    border-radius: $border-radius;
    color: $text-highlight;
    font-size: 14px;
    text-align: left;
    padding: $bdu * 3;
    margin-bottom: $bdu * 6;
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

  &__calendar-item {
    margin-bottom: $bdu * 3;
  }

  &__add-new {
    width: 100%;
  }

  &__continue-container {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  &__continue {
    margin-bottom: $bdu * 4;
  }
}
</style>
