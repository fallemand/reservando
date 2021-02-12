<template>
  <Page v-bind="pageProps">
    <div class="page-not-found__graphic page-not-found__graphic--webp" />
    <h3 class="page-not-found__title">
      {{ $t("pNotFound_cText_BodyTitle") }}
    </h3>
    <p class="page-not-found__text">
      {{ $t("pNotFound_cText_BodyText") }}
    </p>
  </Page>
</template>

<script lang="ts" src="./not-found.ts" />

<style lang="scss">
@import "~@Assets/styles/variables";
@import "~@Assets/styles/mixins";

@import "./not-found";
</style>
