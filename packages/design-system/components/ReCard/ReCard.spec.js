import { shallowMount } from "@vue/test-utils";
import ReCard from "./ReCard.vue";

describe("ReCard component", () => {
  const slots = {
    default: "__CONTENT__",
  };

  it("should render with default props", () => {
    const wrapper = shallowMount(ReCard, { slots });
    expect(wrapper.element).toMatchSnapshot();
  });
});
