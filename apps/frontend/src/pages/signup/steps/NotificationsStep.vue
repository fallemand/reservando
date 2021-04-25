<template>
  <div class="notifications-step">
    <p class="notifications-step__hint signup__hint">
      {{ $t("signup.notificationsStep.lastStep") }}
    </p>
    <p class="notifications-step__intro signup__intro">
      {{ $t("signup.notificationsStep.question") }}
    </p>
    <ReCardToggle
      v-model="notifications.whatsapp.enabled"
      class="notifications-step__card"
      :label="$t('general.social.whatsapp')"
      @change="updateNotifications"
    >
      <ReInput v-model="notifications.whatsapp.value" @change="updateNotifications" placeholder="3513160567" />
    </ReCardToggle>
    <ReCardToggle
      v-model="notifications.email.enabled"
      class="notifications-step__card"
      :label="$t('general.social.email')"
      @change="updateNotifications"
    >
      <ReInput v-model="notifications.email.value" @change="updateNotifications" placeholder="bookings@my-restaurant.com" />
    </ReCardToggle>
    <ContinueButton class="notifications-step__continue" @click="$router.push('congrats')">
      {{ $t("controls.continue") }}
    </ContinueButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ReCardToggle, ReInput } from "@reservando/design-system";
import ContinueButton from "../components/ContinueButton.vue";
import { useStore } from "../store";

const RegisterStep = defineComponent({
  components: {
    ReCardToggle,
    ReInput,
    ContinueButton,
  },
  setup() {
    const store = useStore();
    const notifications = ref(store.state.notifications);

    const updateNotifications = (): void => {
      store.dispatch("updateNotifications", notifications.value);
    };

    return {
      notifications,
      updateNotifications,
    };
  },
});
export default RegisterStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.notifications-step {
  &__intro {
    margin-bottom: $bdu * 4;
  }
  &__card {
    margin-bottom: $bdu * 2;
    text-align: left;
  }
}
</style>
