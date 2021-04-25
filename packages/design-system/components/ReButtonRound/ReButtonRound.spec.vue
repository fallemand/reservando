<script lang="ts">
import { shallowMount } from "@vue/test-utils";
import ReButtonRound, { ReButtonRoundSize } from "./ReButtonRound.vue";

describe("ReButtonRound component", () => {
  const props = {
    icon: "__ICON__",
    size: ReButtonRoundSize.large,
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
      onClick: jest.fn(),
      onMouseleave: jest.fn(),
      onMouseover: jest.fn(),
    };
    const wrapper = shallowMount(ReButtonRound, {
      props,
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
