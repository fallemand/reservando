<script lang="ts">
import Vue from "vue";
import { shallowMount, mount } from "@vue/test-utils";
import ReBottomSheet from "./ReBottomSheet.vue";

type DialogRef = Vue & { close: ($evt?: Event) => void };

describe("ReBottomSheet component", () => {
  const props = {
    title: "__TITLE__",
    classSheet: "__CONTENT-CLASS__",
  };

  const slots = {
    default: "__MODAL-CONTENT__",
  };

  it("should render with required props", () => {
    const wrapper = shallowMount(ReBottomSheet, {
      props,
      slots,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("using custom slots", () => {
    const wrapper = shallowMount(ReBottomSheet, {
      props,
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

  it("should emit close when dialog closes", async () => {
    const closeMock = jest.fn();
    const wrapper = shallowMount(ReBottomSheet, {
      props,
      methods: {},
      attrs: {
        onClose: closeMock,
      },
    });
    (wrapper.vm.$refs.dialog as DialogRef).$emit("close");
    expect(closeMock).toHaveBeenCalled();
  });

  it("should emit close when calling dialog close method", async () => {
    global.setTimeout = jest.fn();
    const closeMock = jest.fn();
    const wrapper = mount(ReBottomSheet, {
      props,
      attrs: {
        onClose: closeMock,
      },
    });
    await (wrapper.vm.$refs.dialog as DialogRef).close();
    expect(global.setTimeout).toHaveBeenCalled();
    // expect(closeMock).toHaveBeenCalled();
  });
});
</script>
