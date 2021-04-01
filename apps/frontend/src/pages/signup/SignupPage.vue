<template>
  <Page id="signup" :header="false" :footer="false">
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <SignupHeader v-if="route.meta.header" class="signup__header" />
      </transition>
      <div class="signup__content">
        <transition :name="route.meta.transitionName">
          <component :is="Component" class="signup__pinned" />
        </transition>
      </div>
    </router-view>
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
@import "~@reservando/design-system/styles/variables";

.signup {
  text-align: center;
  height: 100%;
  position: relative;

  &__intro {
    font-weight: 400;
    margin: 0 auto ($bdu * 6);
    font-size: 16px;
    max-width: 280px;
    line-height: 1.6em;
  }

  &__header {
    margin-bottom: $bdu * 4;
  }

  &__content {
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 100%;
  }

  &__pinned {
    position: absolute;
    top: $bdu * 12;
    padding: 0 ($bdu * 4);
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
