<template>
  <header :class="cssClass" class="header">
    Header
  </header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class PageHeader extends Vue {
  @Prop({ default: false, type: Boolean }) readonly isLoading: boolean;
}
</script>

<style lang="scss">
@import "~@Assets/styles/variables";
@import "~@Assets/styles/mixins";

@import "./page-header__small";
@media screen and (min-width: $screen-sm-max) {
  @import "./page-header__medium";
}
</style>
