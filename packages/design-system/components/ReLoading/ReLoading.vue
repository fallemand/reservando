<template>
  <div class="re-loading" :class="$attrs.class">
    <img class="re-loading__image" :src="loadingSvg" alt="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import loadingSvg from "./loading.svg";

const ReLoading = defineComponent({
  name: "ReLoading",
  computed: {
    loadingSvg(): string {
      return loadingSvg;
    },
  },
});

export default ReLoading;
</script>

<style lang="scss" src="./ReLoading.scss" />
