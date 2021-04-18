<script lang="ts">
import { shallowMount } from "@vue/test-utils";
import ReButtonRound from "./ReButtonRound.vue";

describe("ReButtonRound component", () => {
  const props: {
    icon: "__ICON__";
    size: "large";
  };
  it("should render with default props", () => {
    const wrapper = shallowMount(ReButtonRound, {
      props,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render disabled button", () => {
    const wrapper = shallowMount(ReButtonRound, {
      props,
      attrs: {
        disabled: true,
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
    const wrapper = shallowMount(ReButtonRound, {
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
