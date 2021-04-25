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
      slots: {
        default: "__ReCheckbox-Items__",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should call @update:checked on value change", () => {
    const wrapper = shallowMount(ReCheckboxGroup, {
      props: {
        checked: [],
      },
    });
    // Check id-1
    wrapper.vm.handleItemChange(true, "id-1");
    expect(wrapper.emitted()["update:checked"][0]).toEqual([["id-1"]]);
    // Check id-2
    wrapper.vm.handleItemChange(true, "id-2");
    expect(wrapper.emitted()["update:checked"][1]).toEqual([["id-1", "id-2"]]);
    // Uncheck id-2
    wrapper.vm.handleItemChange(false, "id-2");
    expect(wrapper.emitted()["update:checked"][2]).toEqual([["id-1"]]);
  });
});
</script>
