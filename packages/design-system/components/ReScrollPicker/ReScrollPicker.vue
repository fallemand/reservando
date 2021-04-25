<template>
  <ScrollPicker
    class="re-scroll-picker"
    :options="[options]"
    v-bind="{ ...$attrs, modelValue: [$attrs.modelValue], 'onUpdate:modelValue': handleChange }"
    active-class="re-scroll-picker__selected"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScrollPicker from "vue3-scroll-picker";

export interface ReScrollPickerOption {
  label: string;
  value: string | number;
}

const ReScrollPicker = defineComponent({
  name: "ReScrollPicker",
  components: {
    ScrollPicker,
  },
  inheritAttrs: false,
  props: {
    options: {
      type: Array as () => ReScrollPickerOption[],
      required: true,
    },
  },
  methods: {
    handleChange(value: string[] | number[]) {
      this.$emit("update:modelValue", value[0]);
    },
  },
});

export default ReScrollPicker;
</script>

<style lang="scss" src="./ReScrollPicker.scss" />
