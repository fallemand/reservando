<script lang="ts">
import { shallowMount, mount } from "@vue/test-utils";
import ReCheckbox from "./re-checkbox.vue";

describe("ReCheckbox component", () => {
  it("should render with default props", () => {
    const wrapper = shallowMount(ReCheckbox, {
      propsData: {
        id: "testName",
        label: "LABEL",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Renders component app", () => {
    const wrapper = shallowMount(ReCheckbox, {
      propsData: {
        id: "testName",
      },
    });
    expect(wrapper.classes()).toContain("re-checkbox");
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should emit change", () => {
    const wrapper = shallowMount(ReCheckbox, {
      propsData: {
        id: "testName",
      },
    });
    const input = wrapper.find(".re-checkbox input");
    input.setChecked();

    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("should update input for attribute", () => {
    const wrapper = mount(ReCheckbox, {
      propsData: {
        id: "testName",
        label: "testLabel",
      },
    });

    expect(wrapper.find("label").attributes("for")).toBe("testName");
  });

  it("should contain indeterminate prop", () => {
    const wrapper = shallowMount(ReCheckbox, {
      propsData: {
        id: "testName",
        indeterminate: true,
      },
    });
    expect(wrapper.props("indeterminate")).toBe(true);
  });

  it("should contains ref attribute", () => {
    const wrapper = shallowMount(ReCheckbox, {
      propsData: {
        id: "testName",
      },
    });
    const checkbox = wrapper.findComponent({ ref: "input" });
    expect(checkbox.exists()).toBeTruthy();
  });
});
</script>
