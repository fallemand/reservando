<template>
  <ReButton class="google-button" size="large" v-bind="$attrs" @click="handleLogin">
    <template #icon>
      <ReIcon class="google-button__icon" :name="isLoading ? $icons.loading : $icons.google" />
    </template>
    <slot />
  </ReButton>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ReButton } from "@reservando/design-system";
import { Auth } from "@reservando/commons/types";
import FirebaseService from "@/services/firebase";

const GoogleButton = defineComponent({
  components: {
    ReButton,
  },
  emits: ["success", "error"],
  setup(props, context) {
    const isLoading = ref(false);

    const handleLogin = async (): Promise<void> => {
      isLoading.value = true;
      const firebaseService = new FirebaseService();
      try {
        const token = await firebaseService.googleSignup();
        const account: Auth.AccountProvider = {
          token,
          provider: "google",
        };
        context.emit("success", account);
      } catch (e) {
        context.emit("error");
      }
      isLoading.value = false;
    };

    return {
      isLoading,
      handleLogin,
    };
  },
});
export default GoogleButton;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";

.google-button {
  $base-color: $white;
  color: $grey-800;
  background-color: $base-color;
  box-shadow: 0px 0px 1px rgba(0, 50, 77, 0.1), 0px 0px 2px rgba(0, 50, 77, 0.13),
    0px 1px 4px rgba(0, 50, 77, 0.1);

  &:hover {
    background-color: darken($base-color, 10%);
  }

  &:active {
    background-color: darken($base-color, 20%);
  }

  &__icon {
    color: $white;
  }
}
</style>
