<template>
  <ReDialog
    ref="dialog"
    :class-dialog="['re-bottom-sheet', classSheet]"
    vertical-align="bottom"
    size="fullwidth"
    transition="slide-bottom"
    v-bind="$attrs"
    @close="emitClose"
    @hook:mounted="checkScrollable"
  >
    <header
      :class="[
        're-bottom-sheet__header',
        { 're-bottom-sheet__header--with-actions': $slots.action || $slots.close },
      ]"
    >
      <span class="re-bottom-sheet__close" tabindex="0" @click="close" @keydown.enter="close">
        <!-- @slot Change the default close icon -->
        <slot name="close">
          <Icon :icon="$icons.close" class="re-bottom-sheet__close-icon" />
        </slot>
      </span>

      <div v-if="title || $slots.title" class="re-bottom-sheet__title-container">
        <!-- @slot Pass a custom title. See examples -->
        <slot name="title">
          <h2 class="re-bottom-sheet__title">
            {{ title }}
          </h2>
        </slot>
      </div>

      <span v-if="$slots.action" class="re-bottom-sheet__action" tabindex="0">
        <!-- @slot Pass an action to the modal. See examples -->
        <slot name="action" />
      </span>
    </header>

    <hr class="re-bottom-sheet__divider re-bottom-sheet__divider--header" />

    <main ref="content" class="re-bottom-sheet__content">
      <!-- @slot Sheet content -->
      <slot />
    </main>

    <div
      v-if="$slots.footer"
      class="re-bottom-sheet__footer"
      :class="{ 're-bottom-sheet__footer--shadow': scrollableContent }"
    >
      <!-- @slot Sheet footer content -->
      <slot name="footer" />
    </div>
  </ReDialog>
</template>

<script lang="ts">
import Icon from "@/components/Icon/Icon.vue";
import Vue, { defineComponent } from "vue";
import ReDialog from "../ReDialog/ReDialog.vue";

const ReBottomSheet = defineComponent({
  name: "ReBottomSheet",
  components: { ReDialog, Icon },
  props: {
    /** Sheet title */
    title: {
      type: String,
      default: null,
    },
    /** CSS class to add to the sheet */
    classSheet: {
      type: [String, Array, Object],
      default: null,
    },
  },
  data() {
    return {
      scrollableContent: false,
    };
  },
  methods: {
    async checkScrollable(): Promise<void> {
      await this.$nextTick();

      const content = this.$refs.content as HTMLElement;

      if (content) {
        this.scrollableContent = content.scrollHeight > content.clientHeight;
      }
    },
    close($evt?: Event): void {
      const dialog = this.$refs.dialog as Vue & { close: ($evt?: Event) => void };
      dialog.close($evt);
    },
    emitClose($evt: Event): void {
      /** `($evt: Event)` */
      this.$emit("close", $evt);
    },
  },
});

export default ReBottomSheet;
</script>

<style lang="scss" src="./ReBottomSheet.scss" />
