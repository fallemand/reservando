import { shallowMount, mount } from "@vue/test-utils";
import ReCounter from "./ReCounter.vue";

const getMinusButton = (wrapper) => wrapper.find(".re-counter__cta:first-child");
const getPlusButton = (wrapper) => wrapper.find(".re-counter__cta:last-child");

describe("ReCounter component", () => {
  const props = {
    modelValue: 0,
  };

  it("should render with default props", () => {
    const wrapper = shallowMount(ReCounter, {
      props,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should initial value be higher or equal than min", () => {
    const wrapper = shallowMount(ReCounter, {
      props: {
        modelValue: 2,
        min: 10,
      },
    });

    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([10]);
  });

  it("should initial value be lower or equal than max", () => {
    const wrapper = shallowMount(ReCounter, {
      props: {
        modelValue: 20,
        max: 10,
      },
    });

    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([10]);
  });

  it("should decrease value by 1", async () => {
    const wrapper = mount(ReCounter, {
      props: {
        modelValue: 2,
      },
    });

    await getMinusButton(wrapper).trigger("click");

    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([1]);
  });

  it("should increase value by 1", async () => {
    const wrapper = mount(ReCounter, {
      props: {
        modelValue: 1,
      },
    });

    await getPlusButton(wrapper).trigger("click");

    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([2]);
  });

  it("should button be disabled when lower border reached.", () => {
    const wrapper = shallowMount(ReCounter, {
      props: {
        min: 10,
        modelValue: 10,
      },
    });

    expect(wrapper.vm.minDisabled).toBe(true);
  });

  it("should button be disabled when higher border reached.", () => {
    const wrapper = shallowMount(ReCounter, {
      props: {
        max: 10,
        modelValue: 10,
      },
    });

    expect(wrapper.vm.maxDisabled).toBe(true);
  });
});
