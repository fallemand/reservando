<template>
  <ScrollPicker
    class="re-scroll-picker"
    v-bind="{ ...$attrs, modelValue: [$attrs.modelValue], 'onUpdate:modelValue': handleChange }"
    active-class="re-scroll-picker__selected"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScrollPicker from "vue3-scroll-picker";

const ReScrollPicker = defineComponent({
  name: "ReScrollPicker",
  components: {
    ScrollPicker,
  },
  inheritAttrs: false,
  methods: {
    handleChange(value) {
      this.$emit("update:modelValue", value[0]);
    },
  },
});

export default ReScrollPicker;
</script>

<style lang="scss" src="./ReScrollPicker.scss" />
