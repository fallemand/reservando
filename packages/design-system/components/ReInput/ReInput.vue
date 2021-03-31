<template>
  <div class="re-input" :class="$attrs.class">
    <span v-if="$slots.preicon" class="re-input__icon re-input__icon--preicon">
      <slot name="preicon" />
    </span>
    <span v-if="$slots.posticon" class="re-input__icon re-input__icon--posticon">
      <slot name="posticon" />
    </span>
    <input
      ref="input"
      class="re-input__field"
      :class="`re-input__field--${modifier}`"
      :value="modelValue"
      v-bind="{
        ...$attrs,
        class: undefined,
        onChange: undefined,
        onInput: undefined,
      }"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export const MODIFIERS = ["underline", "outline"];

const ReInput = defineComponent({
  name: "ReInput",
  inheritAttrs: false,
  props: {
    modifier: {
      default: "underline",
      type: String as PropType<typeof MODIFIERS[number]>,
      validator: (value: string): boolean => MODIFIERS.includes(value),
    },
    modelValue: {
      required: true,
      type: [String, Number],
    },
  },
});

export default ReInput;
</script>

<style lang="scss" src="./ReInput.scss" />
