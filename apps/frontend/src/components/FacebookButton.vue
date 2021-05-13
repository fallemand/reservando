<template>
  <ReButton class="facebook-button" size="large" v-bind="$attrs" @click="handleLogin">
    <template #icon>
      <ReIcon class="facebook-button__icon" :name="isLoading ? $icons.loading : $icons.facebook" />
    </template>
    <slot />
  </ReButton>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ReButton } from "@reservando/design-system";
import FirebaseService from "@/services/firebase";

const FacebookButton = defineComponent({
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
        const token = await firebaseService.facebookSignup();
        console.log(token);
        context.emit("success", token);
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
export default FacebookButton;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";

.facebook-button {
  $base-color: #41639d;
  background-color: $base-color;

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
