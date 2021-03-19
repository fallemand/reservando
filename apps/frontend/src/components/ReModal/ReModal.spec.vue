<script lang="ts">
import Vue from "vue";
import { shallowMount, mount } from "@vue/test-utils";
import ReModal from "./ReModal.vue";

describe("ReModal component", () => {
  const propsData = {
    title: "__TITLE__",
    description: "__DESCRIPTION__",
    class: "__CLASS__",
    classModal: "__CONTENT-CLASS__",
  };

  const slots = {
    default: "__MODAL-CONTENT__",
  };

  it("should render with required props", () => {
    const wrapper = shallowMount(ReModal, {
      propsData,
      slots,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render with all props", () => {
    const wrapper = shallowMount(ReModal, {
      propsData,
      slots,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("using custom slots", () => {
    const wrapper = shallowMount(ReModal, {
      propsData,
      slots: {
        ...slots,
        description: "<b>__CUSTOM-DESCRIPTION</b>",
        action: "<button>__ACTION__</button>",
        close: "<button>__CLOSE__</button>",
        title: "<h2>__TITLE__</h2>",
        footer: "<div>__FOOTER__</div>",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Should check if scrollable on mount", () => {
    const spy = jest.spyOn(ReModal.options.methods, "checkScrollable");
    shallowMount(ReModal, {
      propsData,
      slots,
    });
    expect(spy).toHaveBeenCalled();
  });

  it("should emit close when dialog closes", async () => {
    const closeMock = jest.fn();
    const wrapper = shallowMount(ReModal, {
      propsData,
      listeners: {
        close: closeMock,
      },
    });
    (wrapper.vm.$refs.dialog as Vue).$emit("close");
    expect(closeMock).toHaveBeenCalled();
  });

  it("should emit close when calling dialog close method", async () => {
    const closeMock = jest.fn();
    const wrapper = mount(ReModal, {
      propsData,
      listeners: {
        close: closeMock,
      },
    });
    await (wrapper.vm.$refs.dialog as Vue & { close: ($evt?: Event) => void }).close();
    expect(closeMock).toHaveBeenCalled();
  });
});
</script>
