<template>
  <Page id="home">TEST</Page>
</template>

<script lang="ts" src="./home.ts" />

<style lang="scss">
@import "~@Assets/styles/variables";

@import "./home__small";
@media screen and (min-width: $screen-sm-max) {
  @import "./home__medium";
}
</style>
