<template>
  <ReScrollPicker v-bind="$attrs" :options="options" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReScrollPicker } from "@reservando/design-system";

const CalendarStep = defineComponent({
  components: {
    ReScrollPicker,
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
