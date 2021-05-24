<template>
  <div class="congrats-step">
    <ReTransition mode="out-in">
      <ReLoading v-if="loading" class="congrats-step__loading" />
      <p v-else-if="state.error" class="congrats-step__error">
        {{ state.error }}
      </p>
      <div v-else class="congrats-step__container">
        <div class="congrats-step__highlight">
          <p class="congrats-step__hint">{{ $t("signup.congratsStep.hint") }}</p>
          <h2
            class="congrats-step__title"
            v-html="$t('signup.congratsStep.title', [`<strong>${state.name}</strong>`])"
          />
          <div class="congrats-step__image-container">
            <img class="congrats-step__image" :src="congratsImage" alt="Singup" />
          </div>
        </div>

        <p class="congrats-step__link-description">
          {{ $t("signup.congratsStep.shareLinkDescription") }}
        </p>
        <ReButton class="congrats-step__cta" size="large" modifier="secondary" :href="$urls.home">
          {{ $t("signup.congratsStep.previewUrl", [state.name.toLowerCase().replace(" ", "-")]) }}
        </ReButton>

        <p class="congrats-step__link-description">
          {{ $t("signup.congratsStep.portalLinkDescription") }}
        </p>
        <ReButton class="congrats-step__cta" modifier="secondary-outline" size="large">
          {{ $t("signup.congratsStep.dashboard") }}
        </ReButton>
      </div>
    </ReTransition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ReButton, ReLoading, ReTransition } from "@reservando/design-system";
import congratsImage from "@/assets/images/signup-congrats.png";
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
      congratsImage,
    };
  },
});
export default WelcomeHeader;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.congrats-step {
  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__highlight {
    margin: (-$bdu * 4) (-$bdu * 4) ($bdu * 4);
    padding: $bdu * 4;
    padding-bottom: 0;
    background-color: $primary-100;
  }

  &__image {
    min-height: 208px;
    max-width: 200px;
  }

  &__image-container {
    display: flex;
    justify-content: flex-end;
  }

  &__hint {
    @extend .re-body-18;
    color: $grey-800;
    margin-bottom: $bdu * 2;
  }

  &__title {
    @extend .re-title-28;
    margin-bottom: $bdu * 2;
    flex-grow: 1;
    color: $grey-800;

    strong {
      color: $primary-500;
    }
  }

  &__link-description {
    @extend .re-body-16;
    margin-bottom: $bdu * 1.5;
  }

  &__cta {
    text-align: center;
    margin-bottom: $bdu * 4;
  }
}
</style>
