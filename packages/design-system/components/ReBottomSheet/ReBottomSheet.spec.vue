<script lang="ts">
import Vue from "vue";
import { shallowMount, mount } from "@vue/test-utils";
import ReBottomSheet from "./ReBottomSheet.vue";

type DialogRef = Vue & { close: ($evt?: Event) => void };

describe("ReBottomSheet component", () => {
  const propsData = {
    title: "__TITLE__",
    class: "__CLASS__",
    classSheet: "__CONTENT-CLASS__",
  };

  const slots = {
    default: "__MODAL-CONTENT__",
  };

  it("should render with required props", () => {
    const wrapper = shallowMount(ReBottomSheet, {
      propsData,
      slots,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("using custom slots", () => {
    const wrapper = shallowMount(ReBottomSheet, {
      propsData,
      slots: {
        ...slots,
        action: "<button>__ACTION__</button>",
        close: "<button>__CLOSE__</button>",
        title: "<h2>__TITLE__</h2>",
        footer: "<div>__FOOTER__</div>",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Should check if scrollable on mount", () => {
    const spy = jest.spyOn(ReBottomSheet.options.methods, "checkScrollable");
    shallowMount(ReBottomSheet, {
      propsData,
      slots,
    });
    expect(spy).toHaveBeenCalled();
  });

  it("should emit close when dialog closes", async () => {
    const closeMock = jest.fn();
    const wrapper = shallowMount(ReBottomSheet, {
      propsData,
      listeners: {
        close: closeMock,
      },
    });
    (wrapper.vm.$refs.dialog as DialogRef).$emit("close");
    expect(closeMock).toHaveBeenCalled();
  });

  it("should emit close when calling dialog close method", async () => {
    const closeMock = jest.fn();
    const wrapper = mount(ReBottomSheet, {
      propsData,
      listeners: {
        close: closeMock,
      },
    });
    await (wrapper.vm.$refs.dialog as DialogRef).close();
    expect(closeMock).toHaveBeenCalled();
  });
});
</script>
