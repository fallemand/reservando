<script lang="ts">
import { shallowMount } from "@vue/test-utils";
import TimeSelector from "./TimeSelector.vue";

describe("TimeSelector component", () => {
  it("should render with default props", () => {
    const wrapper = shallowMount(TimeSelector);
    expect(wrapper.element).toMatchSnapshot();
  });
});
</script>
