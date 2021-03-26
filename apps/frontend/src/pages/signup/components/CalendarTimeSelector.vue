<template>
  <div class="calendar-time-selector" :class="$attrs.class">
    <label class="calendar-time-selector__label" for="from">{{ label }}</label>
    <ReInput
      :id="id"
      class="calendar-time-selector__input"
      readonly
      modifier="outline"
      :value="$attrs.modelValue"
      @click="showSelecttor = !showSelecttor"
    />
    <ReTransition transition="height">
      <TimeSelector
        v-show="showSelecttor"
        class="calendar-time-selector__scroll-picker"
        v-bind="$attrs"
      />
    </ReTransition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReInput, ReTransition } from "@reservando/design-system";
import TimeSelector from "@/components/TimeSelector/TimeSelector.vue";

const CalendarStep = defineComponent({
  components: {
    ReInput,
    TimeSelector,
    ReTransition,
  },
  inheritAttrs: false,
  props: {
    id: { type: String, required: true },
    label: { type: String, default: "" },
  },
  data() {
    return {
      showSelecttor: false,
    };
  },
});
export default CalendarStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.calendar-time-selector {
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;

  &__label {
    flex-grow: 1;
    text-align: left;
    color: $text-secondary;
  }
  &__input {
    flex-shrink: 0;
    flex-basis: 40%;
  }
  &__scroll-picker {
    max-height: 210px;
  }
}
</style>
