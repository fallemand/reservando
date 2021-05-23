<template>
  <ReScrollPicker v-bind="$attrs" :model-value="modelValue" :options="options" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ReScrollPicker } from "@reservando/design-system";
import { Time } from "@reservando/commons/types";

const CalendarStep = defineComponent({
  components: {
    ReScrollPicker,
  },
  props: {
    modelValue: { type: String as PropType<Time.Time>, required: true },
  },
  computed: {
    times(): string[] {
      const times: string[] = [];
      for (var hour = 0; hour < 24; hour++) {
        times.push(`${hour.toString().padStart(2, "0")} : 00`);
        times.push(`${hour.toString().padStart(2, "0")} : 30`);
      }
      return times;
    },
    options() {
      return this.times.map((time) => ({
        label: time,
        value: time.replaceAll(" ", ""),
      }));
    },
  },
});
export default CalendarStep;
</script>
