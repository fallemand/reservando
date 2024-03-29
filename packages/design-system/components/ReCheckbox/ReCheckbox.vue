<template>
  <div
    class="re-checkbox"
    :class="[
      `re-checkbox--${modifier}`,
      {
        're-checkbox--checked': isChecked || indeterminate,
        're-checkbox--disabled': $attrs.disabled,
      },
    ]"
  >
    <div class="re-checkbox__container">
      <input
        :id="id"
        ref="input"
        type="checkbox"
        :checked="isChecked"
        class="re-checkbox__input"
        v-bind="$attrs"
        :indeterminate.prop="indeterminate"
        v-on="{
          change: emitChange,
        }"
      />
      <span class="re-checkbox__check" />
    </div>

    <label v-if="label || $slots.label" class="re-checkbox__label" :for="id">
      <!-- @slot Useful to pass HTML or something custom -->
      <slot name="label-slot">
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export enum CheckboxModifier {
  default = "default",
  contained = "contained",
  inverted = "inverted",
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
      validator: (value: CheckboxModifier): boolean =>
        Object.values(CheckboxModifier).includes(value),
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
        /** `(value: string)`<br /> fired when changed */
        this.$emit("update:checked", checked);
      }
    },
  },
});

export default ReCheckbox;
</script>

<style lang="scss" src="./ReCheckbox.scss" />
