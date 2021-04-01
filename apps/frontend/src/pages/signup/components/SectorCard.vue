<template>
  <ReCard class="sector-card">
    <ReSwitch class="sector-card__switch" :id="label.trim()" :label="label" v-model="checked" />
    <ReTransition transition="height">
      <div v-show="checked" class="sector-card__content">
        <div class="sector-card__table">
          <label class="sector-card__table-label" for="table-for-2">
            {{ $t("signup.sectorsStep.tableFor", [2]) }}
          </label>
          <ReCounter id="table-for-2" v-model="tables.for2" />
        </div>
        <div class="sector-card__table">
          <label class="sector-card__table-label" for="table-for-4">
            {{ $t("signup.sectorsStep.tableFor", [4]) }}
          </label>
          <ReCounter id="table-for-4" v-model="tables.for4" />
        </div>
        <div class="sector-card__table">
          <label class="sector-card__table-label" for="table-for-6">
            {{ $t("signup.sectorsStep.tableFor", [6]) }}
          </label>
          <ReCounter id="table-for-6" v-model="tables.for6" />
        </div>
        <div class="sector-card__table">
          <label class="sector-card__table-label" for="table-for-8">
            {{ $t("signup.sectorsStep.tableFor", [8]) }}
          </label>
          <ReCounter id="table-for-8" v-model="tables.for8" />
        </div>
      </div>
    </ReTransition>
  </ReCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReCard, ReSwitch, ReTransition, ReCounter } from "@reservando/design-system";

const SectorCard = defineComponent({
  components: {
    ReCard,
    ReSwitch,
    ReTransition,
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
  &__switch {
    flex-direction: row-reverse;
  }

  &__content {
    margin-top: $bdu * 2;
  }

  &__table {
    display: flex;
    align-items: center;
    padding: ($bdu * 1) 0;
  }

  &__table-label {
    flex-grow: 1;
    flex-shrink: 0;
    margin-right: $bdu * 3;
  }

  .re-switch__label {
    flex-grow: 1;
    text-align: left;
    font-weight: $font-weight-medium;
    font-size: 18px;
  }
}
</style>
