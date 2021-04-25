<template>
  <div class="re-form-field">
    <slot />
    <ReTransition name="height">
      <p v-show="error" class="re-form-field__error">
        {{ error }}
      </p>
    </ReTransition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReTransition from "../ReTransition/ReTransitionGroup.vue";

/**
 * This component allows you to add `label` `hint` & `error` to any form component. <br />
 * Use it to wrap your ReInput, ReSelect, ReCheckbox, etc
 */
export default defineComponent({
  name: "ReFormField",
  components: {
    ReTransition,
  },
  props: {
    error: {
      default: null,
      type: String,
    },
  },
});
</script>

<style lang="scss" src="./ReFormField.scss" />
