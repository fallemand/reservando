<script lang="ts">
import { shallowMount } from "@vue/test-utils";
import ReScrollPicker from "./ReScrollPicker.vue";

describe("ReScrollPicker component", () => {
  const props = {
    options: [
      { label: "Test1", value: 1 },
      { label: "Test2", value: 2 },
    ],
  };
  it("should render with default props", () => {
    const wrapper = shallowMount(ReScrollPicker, {
      props,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
</script>
