<template>
  <ReCardToggle
    v-model="values.enabled"
    class="sector-card"
    :label="label"
    @update:modelValue="handleChange"
  >
    <div class="sector-card__item">
      <label class="sector-card__item-label" for="table-for-2">
        {{ $t("signup.sectorsStep.tableFor", [2]) }}
      </label>
      <ReCounter id="table-for-2" v-model="values.for2" @update:modelValue="handleChange" />
    </div>
    <div class="sector-card__item">
      <label class="sector-card__item-label" for="table-for-4">
        {{ $t("signup.sectorsStep.tableFor", [4]) }}
      </label>
      <ReCounter id="table-for-4" v-model="values.for4" @update:modelValue="handleChange" />
    </div>
    <div class="sector-card__item">
      <label class="sector-card__item-label" for="table-for-6">
        {{ $t("signup.sectorsStep.tableFor", [6]) }}
      </label>
      <ReCounter id="table-for-6" v-model="values.for6" @update:modelValue="handleChange" />
    </div>
    <div class="sector-card__item">
      <label class="sector-card__item-label" for="table-for-8">
        {{ $t("signup.sectorsStep.tableFor", [8]) }}
      </label>
      <ReCounter id="table-for-8" v-model="values.for8" @update:modelValue="handleChange" />
    </div>
  </ReCardToggle>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { ReCardToggle, ReCounter } from "@reservando/design-system";
import { Sector } from "../types";

const SectorCard = defineComponent({
  components: {
    ReCardToggle,
    ReCounter,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    sector: {
      type: Object as PropType<Sector>,
      required: true,
    },
  },
  emits: ["change"],
  setup(props, context) {
    const values = ref<Sector>(JSON.parse(JSON.stringify(props.sector)));

    const handleChange = () => {
      context.emit("change", values.value);
    };

    return {
      handleChange,
      values,
    };
  },
});
export default SectorCard;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.sector-card {
  &__item {
    display: flex;
    align-items: center;
    padding: ($bdu * 1) 0;
  }

  &__item-label {
    flex-grow: 1;
    flex-shrink: 0;
    margin-right: $bdu * 3;
  }
}
</style>
