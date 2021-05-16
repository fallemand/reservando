<template>
  <Page id="signup" :header="false" :footer="false">
    <b>User:</b>
    {{ $user.email }}
    <br />
    <b>Shops:</b>
    <ul>
      <li v-for="shop in state.shops" :key="shop.id">
        {{ shop.name }}
      </li>
    </ul>
    <button @click="handleLogout">Logout</button>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Page from "@/components/Page/Page.vue";
import FirebaseService from "@/services/firebase";
import { useStore } from "./store";

const firebase = new FirebaseService();

const HomePage = defineComponent({
  components: {
    Page,
  },
  setup() {
    const store = useStore();
    const state = store.state;

    store.dispatch("loadDefaultState");

    const handleLogout = async (): Promise<void> => {
      await firebase.logoutUser();
    };

    return {
      handleLogout,
      state,
    };
  },
});

export default HomePage;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";

.home {
}
</style>
