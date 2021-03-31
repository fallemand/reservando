<template>
  <div class="re-counter">
    <ReButton class="re-counter__cta" size="small" :disabled="minDisabled" @click="decrease">
      <ReIcon name="minus" />
    </ReButton>
    <ReInput
      ref="input"
      type="number"
      class="re-counter__input"
      :modelValue="modelValue"
      :min="min"
      :max="max"
      :step="step"
      @change="inputChange"
    />
    <ReButton class="re-counter__cta" size="small" :disabled="maxDisabled" @click="increase">
      <ReIcon name="plus" />
    </ReButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReIcon from "../ReIcon/ReIcon.vue";
import ReButton from "../ReButton/ReButton.vue";
import ReInput from "../ReInput/ReInput.vue";

const ReCounter = defineComponent({
  name: "ReCounter",
  components: {
    ReButton,
    ReInput,
    ReIcon,
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
