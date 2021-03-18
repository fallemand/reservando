<script lang="ts">
import { shallowMount } from "@vue/test-utils";
import GygButton from "./re-button.vue";

describe("GygButton component", () => {
  it("should render with default props", () => {
    const wrapper = shallowMount(GygButton, {
      slots: {
        default: "__BUTTON-TEXT__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render disabled button", () => {
    const wrapper = shallowMount(GygButton, {
      propsData: {
        disabled: true,
      },
      slots: {
        default: "__BUTTON-TEXT__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render with props", () => {
    const wrapper = shallowMount(GygButton, {
      propsData: {
        modifier: "cta-success",
        size: "large",
        type: "submit",
      },
      slots: {
        default: "__BUTTON-TEXT__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render as <a /> when href is passed", () => {
    const wrapper = shallowMount(GygButton, {
      propsData: {
        href: "http://fake-url.com",
        target: "_blank",
      },
      slots: {
        default: "__BUTTON-TEXT__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should support class attribute", () => {
    const wrapper = shallowMount(GygButton, {
      slots: {
        default: "__BUTTON-TEXT__",
      },
      context: {
        staticClass: "custom-class1",
        class: { "custom-class2": true, "custom-class3": true },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render with icon", () => {
    const wrapper = shallowMount(GygButton, {
      slots: {
        default: "__BUTTON-TEXT__",
        icon: "__ICON__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should bind all listeners to the button", () => {
    const listeners = {
      click: jest.fn(),
      mouseleave: jest.fn(),
      mouseover: jest.fn(),
    };
    const wrapper = shallowMount(GygButton, {
      listeners,
    });
    const input = wrapper.find("button");
    input.trigger("click");
    input.trigger("mouseleave");
    input.trigger("mouseover");
    expect(listeners.click).toHaveBeenCalled();
    expect(listeners.mouseleave).toHaveBeenCalled();
    expect(listeners.mouseover).toHaveBeenCalled();
  });
});
</script>
