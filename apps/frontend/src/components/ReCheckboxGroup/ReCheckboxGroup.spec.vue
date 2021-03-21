<script lang="ts">
import { shallowMount, mount } from "@vue/test-utils";
import ReCheckboxGroup from "./re-checkbox-group.vue";
import GygRadio from "../gyg-radio/gyg-radio.vue";

describe("ReCheckboxGroup component", () => {
  it("should render with default props", () => {
    const wrapper = shallowMount(ReCheckboxGroup, {
      propsData: {
        id: "testName",
        name: "test",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Renders component app", () => {
    const wrapper = shallowMount(ReCheckboxGroup, {
      propsData: {
        id: "testName",
        name: "test",
      },
    });
    expect(wrapper.classes()).toContain("re-checkbox-group");
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should call @change and @input with args (value, $event)", () => {
    const listeners = {
      change: jest.fn(),
      input: jest.fn(),
    };
    const wrapper = mount(ReCheckboxGroup, {
      slots: {
        default: `
          <GygRadio id="single-ev" label="Single" value="__VALUE__" />
          <GygRadio id="divorced-ev" label="Divorced" value="divorced" />
          <GygRadio id="married-ev" label="Married" value="married" />`,
      },
      stubs: {
        GygRadio,
      },
      propsData: {
        name: "test",
        value: "__VALUE__",
      },
      listeners,
      provide: {
        name: "test",
      },
    });
    const input = wrapper.find("input");
    input.trigger("change");
    input.trigger("input");
    expect(listeners.change).toHaveBeenCalledWith("__VALUE__", expect.any(Event));
    expect(listeners.input).toHaveBeenCalledWith("__VALUE__", expect.any(Event));
  });
});
</script>
