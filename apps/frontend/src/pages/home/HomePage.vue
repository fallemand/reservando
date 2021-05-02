<template>
  <Page id="signup" :header="false" :footer="false">
    {{ $user }}
    <button @click="handleLogout">Logout</button>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Page from "@/components/Page/Page.vue";
import FirebaseService from "@/services/firebase";

const firebase = new FirebaseService();

const HomePage = defineComponent({
  components: {
    Page,
  },
  methods: {
    async handleLogout(): Promise<void> {
      await firebase.logoutUser();
    },
  },
});

export default HomePage;
</script>

<style lang="scss">
@import "~@reservando/design-system/styles/variables";

.home {

}
</style>
