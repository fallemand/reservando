<template>
  <div class="congrats-step">
    <ReTransition mode="out-in">
      <ReLoading v-if="loading" class="congrats-step__loading" />
      <p v-else-if="state.error" class="congrats-step__error">
        {{ state.error }}
      </p>
      <div v-else class="congrats-step__container">
        <img class="congrats-step__image" :src="congratsSvg" alt="Singup" />
        <h2 class="congrats-step__title">{{ $t("signup.congratsStep.title") }}</h2>
        <p class="congrats-step__description">
          {{ $t("signup.congratsStep.description", [state.name]) }}
        </p>
        <ReButton class="congrats-step__cta" size="large">
          {{ $t("signup.congratsStep.dashboard") }}
        </ReButton>
        <ReButton class="congrats-step__cta" modifier="secondary" size="large">
          {{ $t("signup.congratsStep.simulateReservation") }}
        </ReButton>
      </div>
    </ReTransition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ReButton, ReLoading, ReTransition } from "@reservando/design-system";
import congratsSvg from "@/assets/images/congrats.svg";
import { useStore } from "../store";

const WelcomeHeader = defineComponent({
  components: { ReButton, ReLoading, ReTransition },
  props: {},
  setup() {
    const store = useStore();
    const loading = ref(true);

    onMounted(async () => {
      await store.dispatch("createShop");
      loading.value = false;
    });

    return {
      state: store.state,
      loading,
      congratsSvg,
    };
  },
});
export default WelcomeHeader;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.congrats-step {
  text-align: center;

  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__image {
    max-width: 200px;
    min-height: 208px;
    margin: 0 auto;
    margin-bottom: $bdu * 6;
  }

  &__title {
    @extend .re-title-20;
    margin-bottom: $bdu * 2;
  }

  &__description {
    @extend .re-body-18;
    margin-bottom: $bdu * 2;
    flex-grow: 1;
  }

  &__cta {
    margin-bottom: $bdu;

    &:last-child {
      margin-bottom: $bdu * 4;
    }
  }
}
</style>
