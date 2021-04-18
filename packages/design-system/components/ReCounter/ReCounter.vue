<template>
  <div class="re-counter">
    <ReButtonRound
      class="re-counter__cta"
      size="small"
      modifier="secondary"
      :disabled="minDisabled"
      icon="minus"
      @click="decrease"
    />
    <ReInput
      ref="input"
      type="number"
      class="re-counter__input"
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      @change="inputChange"
    />
    <ReButtonRound
      class="re-counter__cta"
      size="small"
      modifier="secondary"
      :disabled="maxDisabled"
      icon="plus"
      @click="increase"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReButtonRound from "../ReButtonRound/ReButtonRound.vue";
import ReInput from "../ReInput/ReInput.vue";

const ReCounter = defineComponent({
  name: "ReCounter",
  components: {
    ReButtonRound,
    ReInput,
  },
  props: {
    /** Counter value */
    modelValue: {
      required: true,
      type: Number,
    },
    step: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: null,
    },
  },
  computed: {
    minDisabled(): boolean {
      return this.modelValue - this.step < this.min;
    },
    maxDisabled(): boolean {
      if (!this.max) {
        return false;
      }
      return this.modelValue + this.step > this.max;
    },
  },
  created(): void {
    if (this.modelValue < this.min) {
      this.$emit("update:modelValue", this.min);
    }
    if (this.max && this.modelValue > this.max) {
      this.$emit("update:modelValue", this.max);
    }
  },
  methods: {
    lessThanMin(value: number): boolean {
      return value < this.min;
    },
    greaterThanMax(value: number): boolean {
      if (!this.max) {
        return false;
      }
      return value > this.max;
    },
    increase(): void {
      this.$emit("update:modelValue", this.modelValue + this.step);
    },
    decrease(): void {
      this.$emit("update:modelValue", this.modelValue - this.step);
    },
    inputChange(value: string): void {
      let numberValue = Number(value);
      if (this.lessThanMin(value)) {
        numberValue = this.min;
      }
      if (this.greaterThanMax(value)) {
        numberValue = this.max;
      }
      /** Emited when value changed `(value: number)` */
      this.$emit("update:modelValue", numberValue);
    },
  },
});

export default ReCounter;
</script>

<style lang="scss" src="./ReCounter.scss" />
