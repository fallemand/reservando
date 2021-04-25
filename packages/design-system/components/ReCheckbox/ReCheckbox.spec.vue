<script lang="ts">
import { shallowMount, mount } from "@vue/test-utils";
import ReCheckbox from "./ReCheckbox.vue";

describe("ReCheckbox component", () => {
  const global = {
    provide: {
      checkedItems: null,
    },
  };

  it("should render with default props", () => {
    const wrapper = shallowMount(ReCheckbox, {
      props: {
        id: "testName",
        label: "LABEL",
      },
      global,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Renders component app", () => {
    const wrapper = shallowMount(ReCheckbox, {
      props: {
        id: "testName",
      },
      global,
    });
    expect(wrapper.classes()).toContain("re-checkbox");
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should emit change", () => {
    const wrapper = shallowMount(ReCheckbox, {
      props: {
        id: "testName",
      },
      global,
    });
    const input = wrapper.find("input");
    input.setChecked();

    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("should update input for attribute", () => {
    const wrapper = mount(ReCheckbox, {
      props: {
        id: "testName",
        label: "testLabel",
      },
      global,
    });

    expect(wrapper.find("label").attributes("for")).toBe("testName");
  });

  it("should contain indeterminate prop", () => {
    const wrapper = shallowMount(ReCheckbox, {
      props: {
        id: "testName",
        indeterminate: true,
      },
      global,
    });
    expect(wrapper.props("indeterminate")).toBe(true);
  });

  // it("should contains ref attribute", () => {
  //   const wrapper = shallowMount(ReCheckbox, {
  //     propsData: {
  //       id: "testName",
  //     },
  //     global,
  //   });
  //   const checkbox = wrapper.findComponent({ ref: "input" });
  //   expect(checkbox.exists()).toBeTruthy();
  // });
});
</script>
