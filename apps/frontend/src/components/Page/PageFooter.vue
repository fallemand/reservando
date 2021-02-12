<template>
  <footer class="page-footer">Footer</footer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class PageFooter extends Vue {}
</script>

<style lang="scss">
@import "~@Assets/styles/variables";
@import "~@Assets/styles/mixins";

.page-footer {
}
</style>
