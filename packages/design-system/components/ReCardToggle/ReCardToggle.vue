<template>
  <ReCard class="re-card-toggle" :class="$attrs.class">
    <ReSwitch
      :id="label.toLowerCase().replace(/\ /g, '')"
      class="re-card-toggle__switch"
      :label="label"
      v-bind="{ ...$attrs, class: undefined }"
    />
    <ReTransition name="height">
      <div v-show="$attrs.modelValue">
        <div class="re-card-toggle__content">
          <slot />
        </div>
      </div>
    </ReTransition>
  </ReCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReCard from "../ReCard/ReCard.vue";
import ReTransition from "../ReTransition/ReTransition.vue";
import ReSwitch from "../ReSwitch/ReSwitch.vue";

const ReCardToggle = defineComponent({
  name: "ReCardToggle",
  components: {
    ReCard,
    ReTransition,
    ReSwitch,
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
  },
});

export default ReCardToggle;
</script>

<style lang="scss" src="./ReCardToggle.scss" />
