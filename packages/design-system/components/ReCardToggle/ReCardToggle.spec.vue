<script>
import { mount } from "@vue/test-utils";
import ReCardToggle from "./ReCardToggle.vue";

describe("ReCardToggle component", () => {
  const slots = {
    default: "__CONTENT__",
  };
  const props = {
    label: "__LABEL__",
  };
  const attrs = {
    modelValue: true,
  };

  it("should render with default props", () => {
    const wrapper = mount(ReCardToggle, { props, attrs, slots });
    expect(wrapper.element).toMatchSnapshot();
  });
});
</script>
