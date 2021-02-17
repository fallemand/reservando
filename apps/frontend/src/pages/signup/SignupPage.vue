<template>
  <Page id="signup">
    <div class="signup__container">
      <router-view v-slot="{ Component }">
        <transition>
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </Page>
</template>

<script lang="ts" src="./signup.ts" />

<style lang="scss">
@import "~@/assets/styles/variables";

@import "./signup__small";
@media screen and (min-width: $screen-sm-max) {
  @import "./signup__medium";
}
</style>
