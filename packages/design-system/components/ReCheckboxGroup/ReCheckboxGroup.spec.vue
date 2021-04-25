<script lang="ts">
import { shallowMount, mount } from "@vue/test-utils";
import ReCheckboxGroup from "./ReCheckboxGroup.vue";
import ReCheckbox from "../ReCheckbox/ReCheckbox.vue";

describe("ReCheckboxGroup component", () => {
  it("should render with default props", () => {
    const wrapper = shallowMount(ReCheckboxGroup, {
      props: {
        checked: [],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should call @change and @input with args (value, $event)", () => {
    const attrs = {
      onChange: jest.fn(),
      onInput: jest.fn(),
    };
    const wrapper = mount(ReCheckboxGroup, {
      slots: {
        default: `
          <ReCheckbox id="single-ev" label="Single" value="single" />
          <ReCheckbox id="divorced-ev" label="Divorced" value="divorced" />
          <ReCheckbox id="married-ev" label="Married" value="married" />`,
      },
      stubs: {
        ReCheckbox,
      },
      props: {
        checked: [],
      },
      attrs,
      provide: {
        name: "test",
      },
    });
    const input = wrapper.find("input");
    input.trigger("change");
    input.trigger("input");
    expect(attrs.onChange).toHaveBeenCalledWith("__VALUE__", expect.any(Event));
    expect(attrs.onInput).toHaveBeenCalledWith("__VALUE__", expect.any(Event));
  });
});
</script>
