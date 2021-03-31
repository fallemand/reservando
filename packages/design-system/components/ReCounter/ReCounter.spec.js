import { shallowMount } from "@vue/test-utils";
import ReCounter from "./ReCounter.vue";

const getMinusButton = (wrapper) => wrapper.find("button:first-child");
const getPlusButton = (wrapper) => wrapper.find("button:last-child");

describe("ReCounter component", () => {
  it("should render with default props", () => {
    const wrapper = shallowMount(ReCounter);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should update view according to value", () => {
    const expectedValue = 10;
    const wrapper = shallowMount(ReCounter, {
      propsData: {
        value: expectedValue,
      },
    });

    expect(wrapper.find("input").element.value).toBe(expectedValue.toString());
  });
  it("should initial value be higher or equal than min", () => {
    const expectedValue = 10;
    const wrapper = shallowMount(ReCounter, {
      propsData: {
        value: 2,
        min: expectedValue,
      },
    });

    expect(wrapper.emitted().input[0]).toEqual([expectedValue]);
  });
  it("should initial value be lower or equal than max", () => {
    const expectedValue = 10;
    const wrapper = shallowMount(ReCounter, {
      propsData: {
        value: 20,
        max: expectedValue,
      },
    });

    expect(wrapper.emitted().input[0]).toEqual([expectedValue]);
  });
  it("should decrease value by 1", async () => {
    const value = 10;
    const wrapper = shallowMount(ReCounter, {
      propsData: {
        value,
      },
    });

    getMinusButton(wrapper).trigger("click");
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled

    expect(wrapper.emitted().input[0]).toEqual([value - 1]);
  });
  it("should increase value by 1", async () => {
    const value = 10;
    const wrapper = shallowMount(ReCounter, {
      propsData: {
        value,
      },
    });

    getPlusButton(wrapper).trigger("click");
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled

    expect(wrapper.emitted().input[0]).toEqual([value + 1]);
  });
  it("should button be disabled when lower border reached.", async () => {
    const wrapper = shallowMount(ReCounter, {
      propsData: {
        min: 10,
        value: 10,
      },
    });

    const minusButton = getMinusButton(wrapper);
    const disabled = minusButton.attributes("disabled");

    minusButton.trigger("click");
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled

    expect(disabled).toBeTruthy();
  });
  it("should button be disabled when higher border reached.", async () => {
    const wrapper = shallowMount(ReCounter, {
      propsData: {
        max: 10,
        value: 10,
      },
    });

    const plusButton = getPlusButton(wrapper);
    plusButton.trigger("click");
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled

    const disabled = plusButton.attributes("disabled");

    expect(wrapper.emitted().input).toBeUndefined();
    expect(disabled).toBeTruthy();
  });
  it("should not emit when invlied value passed.", async () => {
    const wrapper = shallowMount(ReCounter, {});

    await wrapper.find("input").setValue("some value");

    expect(wrapper.emitted().input).toBeUndefined();
  });
});
