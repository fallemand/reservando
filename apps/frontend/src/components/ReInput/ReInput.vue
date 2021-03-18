<template>
  <div class="re-input">
    <span v-if="$slots.preicon" class="re-input__icon re-input__icon--preicon">
      <slot name="preicon" />
    </span>
    <span v-if="$slots.posticon" class="re-input__icon re-input__icon--posticon">
      <slot name="posticon" />
    </span>
    <input
      ref="input"
      class="re-input__field"
      v-bind="$attrs"
      v-on="{
        change: emitChange,
        input: emitInput,
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const ReInput = defineComponent({
  name: "ReInput",
  inheritAttrs: false,
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
