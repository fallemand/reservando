<template>
  <div class="calendar-time-selector" :class="$attrs.class">
    <label class="calendar-time-selector__label" for="from">{{ label }}</label>
    <ReInput
      :id="id"
      class="calendar-time-selector__input"
      readonly
      modifier="outline"
      :value="modelValue"
      @click="showSelector = !showSelector"
    />
    <ReTransition name="height">
      <TimeSelector
        v-show="showSelector"
        class="calendar-time-selector__scroll-picker"
        v-bind="$attrs"
        :model-value="modelValue"
        @click="showSelector = false"
      />
    </ReTransition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ReInput, ReTransition } from "@reservando/design-system";
import TimeSelector from "@/components/TimeSelector/TimeSelector.vue";
import { Time } from "@reservando/commons/types";

const CalendarTimeSelector = defineComponent({
  components: {
    ReInput,
    TimeSelector,
    ReTransition,
  },
  inheritAttrs: false,
  props: {
    id: { type: String, required: true },
    modelValue: { type: String as PropType<Time.Time>, required: true },
    label: { type: String, default: "" },
  },
  data() {
    return {
      showSelector: false,
    };
  },
});
export default CalendarTimeSelector;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.calendar-time-selector {
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;

  &__label {
    flex-grow: 1;
    text-align: left;
    color: $text-secondary;
  }
  &__input {
    flex-shrink: 0;
    flex-basis: 40%;

    input {
      cursor: pointer;
    }
  }
  &__scroll-picker {
    max-height: 210px;
  }
}
</style>
