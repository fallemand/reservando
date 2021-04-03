<template>
  <ReCard class="re-card-toggle" :class="$attrs.class">
    <ReSwitch class="re-card-toggle__switch" :id="label.toLowerCase().replace(/\ /g, '')" :label="label" v-bind="{ ...$attrs, class: undefined }"/>
    <ReTransition transition="height">
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
  inheritAttrs: false,
  components: {
    ReCard,
    ReTransition,
    ReSwitch,
  },
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
