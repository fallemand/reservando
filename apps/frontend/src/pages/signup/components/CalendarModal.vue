<template>
  <ReBottomSheet class-sheet="calendar-modal" @close="$emit('close')">
    Modal! super cool lasdasdas asdasdasd asd
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

}
</style>
