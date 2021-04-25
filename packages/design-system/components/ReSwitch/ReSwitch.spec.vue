<script>
import { shallowMount } from "@vue/test-utils";
import ReSwitch from "./ReSwitch.vue";

describe("ReSwitch component", () => {
  const props = {
    id: "SWITCH-ID",
    modelValue: false,
  };

  it("should render with default props", () => {
    const wrapper = shallowMount(ReSwitch, { props });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should toggle switch state when clicked", async () => {
    const wrapper = shallowMount(ReSwitch, {
      props,
    });
    const control = wrapper.find(".re-switch__control");
    await control.trigger("click");

    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([true]);
  });

  it("should not trigger if disabled", async () => {
    const wrapper = shallowMount(ReSwitch, {
      props: {
        ...props,
        disabled: true,
      },
    });
    const control = wrapper.find(".re-switch__control");
    await control.trigger("click");

    expect(wrapper.emitted()["update:modelValue"]).toEqual(undefined);
  });
});
</script>
