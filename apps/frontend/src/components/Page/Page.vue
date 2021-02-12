<template>
  <div :class="`page page-${id}`">
    <PageHeader />
    <main :class="`page-container--${type}`" class="page-container">
      <slot />
    </main>
    <PageFooter />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import PageHeader from "./PageHeader.vue";
import PageFooter from "./PageFooter.vue";

declare global {
  interface Window {
    dataLayer: { [key: string]: boolean }[];
  }
}

@Component({
  components: {
    PageHeader,
    PageFooter,
  },
})
export default class Page extends Vue {
  @Prop({ type: String, default: "" }) title!: string;
  @Prop({ type: String, default: "" }) description!: string;
  @Prop({ type: String, required: true }) id!: string;

  setTitle(): void {
    const pageTitle = this.title;
    const titleEl = document.querySelector("title");
    if (titleEl) {
      titleEl.innerHTML = `${this.$t("pGlobal_cPageTitle_SupplierAdministration")} | ${pageTitle}`;
    }
  }

  setMetaDescription(): void {
    const metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    metaDescription.content = this.description;
    document.getElementsByTagName("head")[0].appendChild(metaDescription);
  }
}
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
