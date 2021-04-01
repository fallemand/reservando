<template>
  <div class="re-card" :class="$attrs.class">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const ReCard = defineComponent({
  name: "ReCard",
});

export default ReCard;
</script>

<style lang="scss" src="./ReCard.scss" />
