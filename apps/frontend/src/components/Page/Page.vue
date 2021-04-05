<template>
  <div :class="`page ${id}`">
    <header v-if="header" class="page__header header">
      <a class="header__logo-link" :href="$urls.home">
        <img class="header__logo" :src="logoSvg" />
      </a>
    </header>
    <main class="page__content">
      <slot />
    </main>
    <footer v-if="$user && footer">
      <button type="button" @click="logoutUser">Logout</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FirebaseService from "@/services/firebase";
import logoSvg from "@reservando/design-system/images/logo.svg";

declare global {
  interface Window {
    dataLayer: { [key: string]: boolean }[];
  }
}

const Page = defineComponent({
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
    header: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    logoSvg(): string {
      return logoSvg;
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
@import "~@reservando/design-system/styles/global";
@import "~@reservando/design-system/styles/variables";
@import "~@reservando/design-system/styles/mixins";

@import "./page__small";
@media screen and (min-width: $screen-sm-max) {
  @import "./page__medium";
}
</style>
