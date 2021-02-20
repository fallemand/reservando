<template>
  <Page id="signup" :header="false" :footer="false">
    <SignupHeader />
    <div class="signup__content">
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

.signup {
  text-align: center;

  &__content {
    padding: 0 ($bdu * 4);
  }
}
</style>
