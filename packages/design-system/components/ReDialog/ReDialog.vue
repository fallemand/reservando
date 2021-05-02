<template>
  <ReTransition v-show="show" name="fade">
    <div :class="['re-dialog', { 're-dialog--overlay': overlay }]" @click="handleOverlayClick">
      <ReTransition :name="transition">
        <div
          v-if="show"
          ref="content"
          :class="[
            're-dialog__content',
            `re-dialog__content--${size}`,
            `re-dialog__content--${verticalAlign}`,
            classDialog,
          ]"
        >
          <!-- @slot Default slot to pass any content -->
          <slot />
        </div>
      </ReTransition>
    </div>
  </ReTransition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ReTransition from "../ReTransition/ReTransition.vue";

export const MODAL_OPEN = "re-dialog-open";

/**
 * Generic pop up dialog to generate components like `ReModal`, `ReBottomSheet`, etc <br />
 * It handles the overlay, transitions, aligns, close with ESC, etc
 */
const ReDialog = defineComponent({
  name: "ReDialog",
  components: { ReTransition },
  props: {
    /** Size for the modal */
    size: {
      default: "auto",
      type: String as PropType<"auto" | "fullwidth" | "fullscreen">,
      validator: (value: string): boolean => ["auto", "fullwidth", "fullscreen"].includes(value),
    },
    /** Show overlay in the background */
    overlay: {
      type: Boolean,
      default: true,
    },
    /** Close dialog when clicking the background overlay */
    overlayClose: {
      type: Boolean,
      default: true,
    },
    /** Type of transition */
    transition: {
      type: String as PropType<"fade" | "expand" | "slide-bottom" | "slide-right">,
      default: "fade",
      validator: (value: string): boolean =>
        ["fade", "expand", "slide-bottom", "slide-right"].includes(value),
    },
    /** Vertical align of the dialog */
    verticalAlign: {
      type: String as PropType<"middle" | "bottom" | "top">,
      default: "middle",
      validator: (value: string): boolean => ["middle", "bottom", "top"].includes(value),
    },
    /** CSS class to add to the content div */
    classDialog: {
      type: [String, Array, Object],
      default: null,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true;
    document.body.classList.add(MODAL_OPEN);
    document.body.addEventListener("keydown", this.onEsc);
  },
  unmounted() {
    document.body.classList.remove(MODAL_OPEN);
    document.body.removeEventListener("keydown", this.onEsc);
  },
  methods: {
    handleOverlayClick($evt: Event): void {
      const content = this.$refs.content as HTMLInputElement;
      if (this.overlayClose && content && !content.contains($evt.target as Node)) {
        $evt.stopPropagation();
        this.close($evt);
      }
    },
    onEsc($evt: KeyboardEvent): void {
      const escKeyCode = 27;
      if ($evt.keyCode === escKeyCode) {
        this.close($evt);
      }
    },
    async close($evt?: Event): Promise<void> {
      this.show = false;
      await this.$nextTick();
      /** `($evt: Event)` */
      setTimeout(() => {
        this.$emit("close", $evt);
      }, 300);
    },
  },
});

export default ReDialog;
</script>

<style lang="scss" src="./ReDialog.scss" />
