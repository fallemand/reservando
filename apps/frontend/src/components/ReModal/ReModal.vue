<template>
  <ReDialog
    ref="dialog"
    :class-dialog="['re-modal', classModal]"
    transition="expand"
    v-bind="$attrs"
    @close="emitClose"
    @hook:mounted="checkScrollable"
  >
    <header
      :class="[
        're-modal__header',
        { 're-modal__header--with-actions': $slots.action || $slots.close },
      ]"
    >
      <span class="re-modal__close" tabindex="0" @click="close" @keydown.enter="close">
        <!-- @slot Change the default close icon -->
        <slot name="close">
          <IcClose class="re-modal__close-icon" />
        </slot>
      </span>

      <div v-if="title || $slots.title" class="re-modal__title-container">
        <!-- @slot Pass a custom title. See examples -->
        <slot name="title">
          <h2 class="re-modal__title">
            {{ title }}
          </h2>
        </slot>
      </div>

      <span class="re-modal__action" tabindex="0">
        <!-- @slot Pass an action to the modal. See examples -->
        <slot name="action" />
      </span>
    </header>

    <p v-if="description || $slots.description" class="re-modal__description">
      <!-- @slot Usefull to pass description with HTML -->
      <slot name="description">
        {{ description }}
      </slot>
    </p>

    <main ref="content" class="re-modal__content">
      <!-- @slot Modal content -->
      <slot />
    </main>

    <div
      v-if="$slots.footer"
      class="re-modal__footer"
      :class="{ 're-modal__footer--shadow': scrollableContent }"
    >
      <!-- @slot Modal footer content -->
      <slot name="footer" />
    </div>
  </ReDialog>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import ReDialog from "../re-dialog/ReDialog.vue";
import IcClose from "../gyg-icon/components/ic-close.vue";

const ReModal = defineComponent({
  name: "ReModal",
  components: { ReDialog, IcClose },
  props: {
    /** Modal title */
    title: {
      type: String,
      default: null,
    },
    /** Pass a description to the modal */
    description: {
      type: String,
      default: null,
    },
    /** CSS class to add to the modal */
    classModal: {
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
      await nextTick();

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

export default ReModal;
</script>

<style lang="scss" src="./ReModal.scss" />
