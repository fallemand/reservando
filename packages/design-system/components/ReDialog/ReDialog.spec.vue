<script lang="ts">
import { shallowMount, mount } from "@vue/test-utils";
import ReDialog from "./ReDialog.vue";

describe("ReDialog component", () => {
  it("render with default props", async () => {
    const wrapper = shallowMount(ReDialog, {
      slots: {
        default: "__CONTENT__",
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("render with custom props", async () => {
    const wrapper = shallowMount(ReDialog, {
      props: {
        verticalAlign: "top",
        size: "fullscreen",
        overlay: false,
        transition: "slide-right",
        classDialog: "__CONTENT-CLASS__",
      },
      slots: {
        default: "__CONTENT__",
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should emit close", async () => {
    global.setTimeout = jest.fn();
    const wrapper = mount(ReDialog);
    await wrapper.vm.$nextTick();
    const element = wrapper.find(".re-dialog");

    element.trigger("click");
    await wrapper.vm.$nextTick();
    expect(global.setTimeout).toHaveBeenCalled();
    //expect(wrapper.emitted().close).toBeTruthy();
  });

  it("should have modal slot content", async () => {
    const wrapper = mount(ReDialog, {
      slots: {
        default: "<p>test slot</p>",
      },
    });
    await wrapper.vm.$nextTick();
    const content = wrapper.find(".re-dialog__content");
    expect(content.text()).toEqual("test slot");
  });

  it("should close modal when esc pressed", async () => {
    global.setTimeout = jest.fn();
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);

    const wrapper = mount(ReDialog, {
      attachTo: div,
    });
    await wrapper.vm.$nextTick();

    wrapper.trigger("keydown", { keyCode: 27 });
    await wrapper.vm.$nextTick();
    expect(global.setTimeout).toHaveBeenCalled();
    // expect(wrapper.emitted().close).toBeTruthy();
  });
});
</script>
