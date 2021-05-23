<template>
  <form class="name-step" novalidate @submit.prevent="handleContinue">
    <p class="name-step__intro signup__intro">{{ $t("signup.nameStep.question") }}</p>
    <ReFormField :error="isSubmitted && !state.name && $t('general.validation.required')">
      <ReInput
        class="name-step__field"
        modifier="underline"
        :model-value="state.name"
        :required="true"
        :placeholder="$t('signup.nameStep.inputPlaceholder')"
        @update:modelValue="(value) => $store.dispatch('setName', value)"
      />
    </ReFormField>
    <ContinueButton type="submit">
      {{ $t("signup.continue") }}
    </ContinueButton>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ReInput, ReFormField } from "@reservando/design-system";
import { useRouter } from "vue-router";
import ContinueButton from "../components/ContinueButton.vue";
import { useStore } from "../store";

const NameStep = defineComponent({
  components: {
    ReInput,
    ReFormField,
    ContinueButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isSubmitted = ref(false);

    const changeName = (name: string) => {
      store.dispatch("setName", name);
    };
    const handleContinue = () => {
      isSubmitted.value = true;
      if (store.state.name) {
        router.push("open-days");
      }
    };

    return {
      state: store.state,
      isSubmitted,
      changeName,
      handleContinue,
    };
  },
});
export default NameStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.name-step {
  &__field {
    @extend .re-title-32;
  }
}
</style>
