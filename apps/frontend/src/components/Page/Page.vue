<template>
  <div :class="`page ${id}`">
    <header class="page__header header">
      <a class="header__logo-link" :href="$urls.home">
        <img class="header__logo" :src="logoImg" />
      </a>
    </header>
    <main class="page__content">
      <slot />
    </main>
    <footer v-if="$user">
      <button type="button" @click="logoutUser">Logout</button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FirebaseService from "@Services/firebase";
import logoImg from "@Assets/images/logo.png";

declare global {
  interface Window {
    dataLayer: { [key: string]: boolean }[];
  }
}

const Page = Vue.extend({
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    logoImg(): string {
      return logoImg;
    },
  },
  methods: {
    setTitle(): void {
      const pageTitle = this.title;
      const titleEl = document.querySelector("title");
      if (titleEl) {
        titleEl.innerHTML = `${this.$t(
          "pGlobal_cPageTitle_SupplierAdministration",
        )} | ${pageTitle}`;
      }
    },
    logoutUser(): void {
      const firebaseService = new FirebaseService();
      firebaseService.logoutUser();
    },
    setMetaDescription(): void {
      const metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.content = this.description;
      document.getElementsByTagName("head")[0].appendChild(metaDescription);
    },
  },
});
export default Page;
</script>

<style lang="scss">
@import "~@Assets/styles/global";
@import "~@Assets/styles/variables";
@import "~@Assets/styles/mixins";

@import "./page__small";
@media screen and (min-width: $screen-sm-max) {
  @import "./page__medium";
}
</style>
