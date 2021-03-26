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
      v-bind="{
        ...$attrs,
        class: undefined,
      }"
      v-on="{
        change: emitChange,
        input: emitInput,
      }"
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
  },
  methods: {
    emitChange($evt: Event): void {
      /** `(value: string, $evt: Event)` */
      this.$emit("change", ($evt.target as HTMLInputElement).value, $evt);
    },
    emitInput($evt: Event): void {
      /** `(value: string, $evt: Event)` */
      this.$emit("input", ($evt.target as HTMLInputElement).value, $evt);
    },
  },
});

export default ReInput;
</script>

<style lang="scss" src="./ReInput.scss" />
