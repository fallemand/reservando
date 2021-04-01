<template>
  <div class="re-switch" :class="$attrs.class">
    <input
      id="id"
      ref="input"
      type="checkbox"
      class="re-switch__input"
      role="switch"
      v-bind="{
        ...$attrs,
        class: undefined,
        onChange: undefined,
      }"
      :aria-checked="`${modelValue}`"
      :checked="modelValue"
      aria-label="checkbox"
    />
    <button
      type="button"
      class="re-switch__control"
      :disabled="disabled"
      :class="{
        're-switch__control--checked': modelValue,
        're-switch__control--disabled': disabled,
      }"
      @click="emitChange"
    ></button>
    <label v-if="label" class="re-switch__label" :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const ReSwitch = defineComponent({
  name: "ReSwitch",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: { type: String, default: null },
    id: { type: String, required: true },
  },
  methods: {
    emitChange(): void {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
});

export default ReSwitch;
</script>

<style lang="scss" src="./ReSwitch.scss" />
