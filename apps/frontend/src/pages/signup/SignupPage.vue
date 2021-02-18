<template>
  <Page id="signup" :header="false" :footer="false">
    <div class="signup">
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
