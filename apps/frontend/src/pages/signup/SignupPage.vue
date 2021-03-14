<template>
  <Page id="signup" :header="false" :footer="false">
    <SignupHeader class="signup__header" />
    <div class="signup__content">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transitionName">
          <component :is="Component" class="signup__pinned" />
        </transition>
      </router-view>
    </div>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Page from "@/components/Page/Page.vue";
import SignupHeader from "./components/SignupHeader.vue";

const SignupPage = defineComponent({
  components: {
    Page,
    SignupHeader,
  },
  mounted(): void {},
});

export default SignupPage;
</script>

<style lang="scss">
@import "~@/assets/styles/variables";

.signup {
  text-align: center;
  height: 100%;

  &__header {
    margin-bottom: $bdu * 4;
  }

  &__content {
    display: flex;
    align-items: flex-end;
    padding: 0 ($bdu * 4);
    height: 100%;
    width: 100%;
    position: relative;
  }

  &__pinned {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
}

.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-left-enter-active {
  transition: 0.5s;
}
.slide-right-enter-to,
.slide-left-enter-to {
  transform: translate(0%, 0);
}
.slide-right-enter-from {
  transform: translate(100%, 0);
}
.slide-right-leave-to {
  transform: translate(-100%, 0);
}
.slide-right-leave-from,
.slide-left-leave-from {
  transform: translate(0, 0);
}
.slide-left-enter-from {
  transform: translate(-100%, 0);
}
.slide-left-leave-to {
  transform: translate(100%, 0);
}
</style>
