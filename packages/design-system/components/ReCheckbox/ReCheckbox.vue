<template>
  <div
    class="re-checkbox"
    :class="[`re-checkbox--${modifier}`, { 're-checkbox--checked': isChecked || indeterminate }]"
  >
    <div class="re-checkbox-container">
      <input
        :id="id"
        ref="input"
        type="checkbox"
        :checked="isChecked"
        class="re-checkbox-input"
        v-bind="$attrs"
        :indeterminate.prop="indeterminate"
        v-on="{
          change: emitChange,
        }"
      />
      <span class="re-checkbox-check" />
    </div>

    <label v-if="label || $slots.label" class="re-checkbox-label" :for="id">
      <!-- @slot Useful to pass HTML or something custom -->
      <slot name="label-slot">
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export const MODIFIERS = ["default", "full"];

export enum CheckboxModifier {
  full = "full",
  default = "default",
}

const ReCheckbox = defineComponent({
  name: "ReCheckbox",
  inject: ["checkedItems"],
  props: {
    /** Needed for the attribute `for`. Should be unique on the html doc level */
    id: { type: String, required: true },
    label: { type: String, default: null },
    /** Put checkbox in "maybe" state */
    indeterminate: { type: Boolean, default: false },
    /** One of: `default` `full` */
    modifier: {
      default: "default",
      type: String as PropType<CheckboxModifier>,
      validator: (value: string): boolean =>
        Object.values(CheckboxModifier).includes(value as CheckboxModifier),
    },
  },
  computed: {
    isChecked(): boolean {
      return this.checkedItems ? this.checkedItems(this.id) : this.$attrs.checked;
    },
  },
  methods: {
    emitChange($evt: Event): void {
      const checked = ($evt.target as HTMLInputElement).checked;
      if (this.$parent && this.$parent.$options.name === "ReCheckboxGroup") {
        const checkboxGroup = this.$parent;
        checkboxGroup.handleItemChange(checked, this.id);
      } else {
        /** `(value: string, $evt: Event)`<br /> fired when changed */
        this.$emit("update:checked", checked, $evt);
      }
    },
  },
});

export default ReCheckbox;
</script>

<style lang="scss" src="./ReCheckbox.scss" />
