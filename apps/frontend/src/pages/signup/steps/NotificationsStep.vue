<template>
  <div class="notifications-step">
    <p class="notifications-step__hint">{{ $t("signup.notificationsStep.lastStep") }}</p>
    <p class="notifications-step__intro signup__intro">{{ $t("signup.notificationsStep.question") }}</p>
    <ReCardToggle class="notifications-step__card" v-model="useWhatsapp" :label="$t('general.social.whatsapp')">
      <ReInput v-model="whatsapp" placeholder="3513160567" />
    </ReCardToggle>
    <ReCardToggle class="notifications-step__card" v-model="useEmail" :label="$t('general.social.email')">
      <ReInput v-model="email" placeholder="bookings@my-restaurant.com" />
    </ReCardToggle>
    <ContinueButton class="notifications-step__continue" @click="$router.push('register')">
      {{ $t("controls.continue") }}
    </ContinueButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ReCardToggle, ReInput } from "@reservando/design-system";
import ContinueButton from "../components/ContinueButton.vue";

const RegisterStep = defineComponent({
  components: {
    ReCardToggle,
    ReInput,
    ContinueButton,
  },
  data() {
    return {
      useWhatsapp: false,
      useEmail: false,
      whatsapp: "",
      email: "",
    };
  },
});
export default RegisterStep;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

.notifications-step {
  &__hint {
    font-size: 14px;
  }
  &__intro{
    margin-bottom: $bdu * 4;
  }
  &__card {
    margin-bottom: $bdu * 2;
    text-align: left;
  }
}
</style>
