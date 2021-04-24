<script lang="ts">
import { shallowMount } from "@vue/test-utils";
import ReFormField from "./ReFormField.vue";

describe("ReFormField component", () => {
  const props = {
    error: "__ERROR__",
  };
  it("should render with default props", () => {
    const wrapper = shallowMount(ReFormField, {
      props,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
</script>
