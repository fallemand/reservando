<template>
  <Page id="signup" :header="false" :footer="false">
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <SignupHeader
          v-if="route.meta.header"
          :highlight="route.meta.headerHighlight"
          class="signup__header"
        />
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
});

export default SignupPage;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";

.signup {
  height: 100%;
  position: relative;

  &__intro {
    @extend .re-title-20;
    text-align: left;
    margin-bottom: $bdu * 4;
  }

  &__hint {
    @extend .re-body-14;
    color: $grey-700;
    margin-bottom: $bdu * 1.5;
  }

  &__content {
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 100%;
  }

  &__pinned {
    position: absolute;
    overflow-y: scroll;
    top: $bdu * 7.5;
    padding: ($bdu * 4) ($bdu * 3) 0;
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
