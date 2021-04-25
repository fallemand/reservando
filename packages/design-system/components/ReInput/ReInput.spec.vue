<script lang="ts">
import { shallowMount } from "@vue/test-utils";
import ReInput from "./ReInput.vue";

describe("ReInput component", () => {
  const props = {
    modelValue: "",
  };
  it("should render with default props", () => {
    const wrapper = shallowMount(ReInput, {
      props,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render with preicon", () => {
    const wrapper = shallowMount(ReInput, {
      props,
      slots: {
        preicon: "__PREICON__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render with posticon", () => {
    const wrapper = shallowMount(ReInput, {
      props,
      slots: {
        posticon: "__POSTICON__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should call @change with args (value)", () => {
    const attrs = {
      onChange: jest.fn(),
    };
    const wrapper = shallowMount(ReInput, {
      props: {
        modelValue: "__VALUE__",
      },
      attrs,
    });
    const input = wrapper.find("input");
    input.trigger("change");
    input.trigger("input");
    expect(attrs.onChange).toHaveBeenCalledWith("__VALUE__");
  });

  it("should bind all attributes to the input", () => {
    const wrapper = shallowMount(ReInput, {
      attrs: {
        type: "number",
        min: 0,
      },
      props,
    });
    const input = wrapper.find("input");
    expect(input.attributes().type).toEqual("number");
    expect(input.attributes().min).toEqual("0");
  });

  it("should bind all listeners to the input", () => {
    const attrs = {
      onClick: jest.fn(),
      onKeydown: jest.fn(),
      onBlur: jest.fn(),
    };
    const wrapper = shallowMount(ReInput, {
      attrs,
      props,
    });
    const input = wrapper.find("input");
    input.trigger("click");
    input.trigger("keydown");
    input.trigger("blur");
    expect(attrs.onClick).toHaveBeenCalled();
    expect(attrs.onKeydown).toHaveBeenCalled();
    expect(attrs.onBlur).toHaveBeenCalled();
  });
});
</script>
