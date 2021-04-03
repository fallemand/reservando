<template>
  <ReCardToggle class="sector-card" v-model="checked" :label="label">
    <div class="sector-card__item">
      <label class="sector-card__item-label" for="table-for-2">
        {{ $t("signup.sectorsStep.tableFor", [2]) }}
      </label>
      <ReCounter id="table-for-2" v-model="tables.for2" />
    </div>
    <div class="sector-card__item">
      <label class="sector-card__item-label" for="table-for-4">
        {{ $t("signup.sectorsStep.tableFor", [4]) }}
      </label>
      <ReCounter id="table-for-4" v-model="tables.for4" />
    </div>
    <div class="sector-card__item">
      <label class="sector-card__item-label" for="table-for-6">
        {{ $t("signup.sectorsStep.tableFor", [6]) }}
      </label>
      <ReCounter id="table-for-6" v-model="tables.for6" />
    </div>
    <div class="sector-card__item">
      <label class="sector-card__item-label" for="table-for-8">
        {{ $t("signup.sectorsStep.tableFor", [8]) }}
      </label>
      <ReCounter id="table-for-8" v-model="tables.for8" />
    </div>
  </ReCardToggle>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReCardToggle, ReCounter } from "@reservando/design-system";

const SectorCard = defineComponent({
  components: {
    ReCardToggle,
    ReCounter,
  },
  data() {
    return {
      checked: false,
      tables: {
        for2: 0,
        for4: 0,
        for6: 0,
        for8: 0,
      }
    };
  },
  props: {
    label: {
      type: String,
      required: true,
    }
  }
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
