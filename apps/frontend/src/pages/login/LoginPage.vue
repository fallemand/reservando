<template>
  <Page id="login">
    <div id="firebaseui-auth-container" class="login__container" />
  </Page>
</template>

<script lang="ts" src="./login.ts" />

<style lang="scss">
@import "~@reservando/design-system/styles/variables";

@import "./login__small";
@media screen and (min-width: $screen-sm-max) {
  @import "./login__medium";
}
</style>
