<template>
  <div :class="`re-checkbox-group re-checkbox-group--${orientation}`">
    <!-- @slot Default slot for GygRadio components -->
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

const ReCheckboxGroup = defineComponent({
  name: "ReCheckboxGroup",
  provide() {
    return {
      checkedItems: (id: string) => this.checked.includes(id),
    };
  },
  props: {
    orientation: { type: String, default: "vertical" },
    /** Id of item to show expanded. Array of ids if using multiple */
    checked: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  methods: {
    handleItemChange(checked: boolean, id: string): void {
      let checkedItems: string[] | null = checked
        ? [...this.checked, id]
        : this.checked.filter((item) => item !== id);
      /** `(expandIds: string | string[])` */
      this.$emit("update:checked", checkedItems);
    },
  },
});

export default ReCheckboxGroup;
</script>

<style lang="scss" src="./ReCheckboxGroup.scss" />
