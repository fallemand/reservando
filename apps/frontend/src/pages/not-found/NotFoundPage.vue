<template>
  <Page v-bind="pageProps">
    <div class="page-not-found__graphic page-not-found__graphic--webp" />
    <h3 class="page-not-found__title">
      {{ $t("pNotFound_cText_BodyTitle") }}
    </h3>
    <p class="page-not-found__text">
      {{ $t("pNotFound_cText_BodyText") }}
    </p>
    <GygButton :href="redirectLink" modifier="outline-light" class="page-not-found__cta">
      {{ $t("pNotFound_cText_BodyCta") }}
    </GygButton>
  </Page>
</template>

<script lang="ts" src="./not-found.ts" />

<style lang="scss">
@import "~@Assets/styles/variables";
@import "~@Assets/styles/mixins";

@import "./not-found";
</style>
