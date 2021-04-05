<template>
  <div class="calendar-step">
    <template v-if="!calendarCreated">
      <p class="signup__hint">{{ $t("signup.calendarStep.hint") }}</p>
      <p class="signup__intro">{{ $t("signup.calendarStep.intro") }}</p>
      <div class="calendar-step__tips">
        <h3 class="calendar-step__tips-title">
          {{ $t("signup.calendarStep.tips.title") }}
        </h3>
        <p class="calendar-step__tip">
          <ReIcon class="calendar-step__tip-icon" :name="$icons.hash" />
          <span class="calendar-step__tip-description">
            {{ $t("signup.calendarStep.tips.description1") }}
          </span>
        </p>
        <p class="calendar-step__tip">
          <ReIcon class="calendar-step__tip-icon" :name="$icons.grid"/>
          <span class="calendar-step__tip-description">
            {{ $t("signup.calendarStep.tips.description2") }}
          </span>
        </p>
        <p class="calendar-step__tip">
          <ReIcon class="calendar-step__tip-icon" :name="$icons.plus" />
          <span class="calendar-step__tip-description">
            {{ $t("signup.calendarStep.tips.description3") }}
          </span>
        </p>
      </div>
      <ReButton class="calendar-step__button" size="large" @click="showModal = true">
        {{ $t("signup.calendarStep.ctaCreate") }}
      </ReButton>
      <ReButton class="calendar-step__button" size="large" modifier="secondary">
        Ver ejemplos
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
      <p class="calendar-step__hint">
        {{ $t("signup.calendarStep.personalizeLater") }}
      </p>
      <ContinueButton @click="$router.push('sectors')">
        {{ $t("controls.continue") }}
      </ContinueButton>
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
import CalendarModal from "../components/CalendarModal.vue";
import CalendarTime from "../components/CalendarTime.vue";
import ContinueButton from "../components/ContinueButton.vue";

const CalendarStep = defineComponent({
  components: {
    ReButton,
    CalendarModal,
    CalendarTime,
    ContinueButton,
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
  &__tips {
    color: $text-secondary;
    font-size: 14px;
    text-align: left;
    padding: 0 ($bdu * 2);
    margin-bottom: $bdu * 6;
  }

  &__tips-title {
    @extend .re-caption-up;
    margin: 0 0 $bdu * 2;
  }

  &__tip {
    display: flex;
    margin-bottom: 2 * $bdu;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__tip-icon {
    flex-shrink: 0;
    font-size: 20px;
    color: $primary-500;
    margin-right: $bdu * 1.5;
    margin-top: $bdu/2;
    align-items: flex-start;
  }

  &__tip-description {
    @extend .re-body-strong-16;
  }

  &__button {
    margin-bottom: $bdu;
  }

  &__calendar-item {
    margin-bottom: $bdu * 3;
    padding: $bdu * 3;
  }

  &__add-new {
    width: 100%;
    margin-bottom: $bdu * 2;
  }

  &__hint {
    color: $text-secondary;
  }
}
</style>
