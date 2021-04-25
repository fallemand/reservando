<script lang="ts">
import { shallowMount } from "@vue/test-utils";
import ReButton from "./ReButton.vue";

describe("ReButton component", () => {
  it("should render with default props", () => {
    const wrapper = shallowMount(ReButton, {
      slots: {
        default: "__BUTTON-TEXT__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render disabled button", () => {
    const wrapper = shallowMount(ReButton, {
      attrs: {
        disabled: true,
      },
      slots: {
        default: "__BUTTON-TEXT__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render with props", () => {
    const wrapper = shallowMount(ReButton, {
      props: {
        modifier: "secondary",
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
    const wrapper = shallowMount(ReButton, {
      attrs: {
        href: "http://fake-url.com",
        target: "_blank",
      },
      slots: {
        default: "__BUTTON-TEXT__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render with icon", () => {
    const wrapper = shallowMount(ReButton, {
      slots: {
        default: "__BUTTON-TEXT__",
        icon: "__ICON__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should bind all listeners to the button", () => {
    const listeners = {
      onClick: jest.fn(),
      onMouseleave: jest.fn(),
      onMouseover: jest.fn(),
    };
    const wrapper = shallowMount(ReButton, {
      attrs: listeners,
    });
    const input = wrapper.find("button");
    input.trigger("click");
    input.trigger("mouseleave");
    input.trigger("mouseover");
    expect(listeners.onClick).toHaveBeenCalled();
    expect(listeners.onMouseleave).toHaveBeenCalled();
    expect(listeners.onMouseover).toHaveBeenCalled();
  });
});
</script>
