<script>
import { shallowMount } from "@vue/test-utils";
import ReLoading from "./ReLoading.vue";

describe("ReLoading component", () => {
  const slots = {
    default: "__CONTENT__",
  };

  it("should render with default props", () => {
    const wrapper = shallowMount(ReLoading, { slots });
    expect(wrapper.element).toMatchSnapshot();
  });
});
</script>
