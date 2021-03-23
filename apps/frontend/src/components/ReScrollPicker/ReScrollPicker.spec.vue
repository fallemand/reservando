<script lang="ts">
import { shallowMount } from "@vue/test-utils";
import ReScrollPicker from "./ReScrollPicker.vue";

describe("ReScrollPicker component", () => {
  it("should render with default props", () => {
    const wrapper = shallowMount(ReScrollPicker);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render with preicon", () => {
    const wrapper = shallowMount(ReScrollPicker, {
      slots: {
        preicon: "__PREICON__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render with posticon", () => {
    const wrapper = shallowMount(ReScrollPicker, {
      slots: {
        posticon: "__POSTICON__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should call @change and @input with args (value, $event)", () => {
    const listeners = {
      change: jest.fn(),
      input: jest.fn(),
    };
    const wrapper = shallowMount(ReScrollPicker, {
      propsData: {
        value: "__VALUE__",
      },
      listeners,
    });
    const input = wrapper.find("input");
    input.trigger("change");
    input.trigger("input");
    expect(listeners.change).toHaveBeenCalledWith("__VALUE__", expect.any(Event));
    expect(listeners.input).toHaveBeenCalledWith("__VALUE__", expect.any(Event));
  });

  it("should bind all attributes to the input", () => {
    const wrapper = shallowMount(ReScrollPicker, {
      propsData: {
        required: true,
        type: "number",
        min: 0,
      },
    });
    const input = wrapper.find("input");
    expect(input.attributes().required).toEqual("required");
    expect(input.attributes().type).toEqual("number");
    expect(input.attributes().min).toEqual("0");
  });

  it("should bind all listeners to the input", () => {
    const listeners = {
      click: jest.fn(),
      keydown: jest.fn(),
      blur: jest.fn(),
    };
    const wrapper = shallowMount(ReScrollPicker, {
      listeners,
    });
    const input = wrapper.find("input");
    input.trigger("click");
    input.trigger("keydown");
    input.trigger("blur");
    expect(listeners.click).toHaveBeenCalled();
    expect(listeners.keydown).toHaveBeenCalled();
    expect(listeners.blur).toHaveBeenCalled();
  });
});
</script>
