<script lang="ts">
import { shallowMount } from "@vue/test-utils";
import ReTransition from "./ReTransition.vue";
import { heightTransition } from "./transitions";

describe("ReTransition component", () => {
  it("should render with default props", () => {
    const wrapper = shallowMount(ReTransition);
    expect(wrapper.exists()).toBe(true);
  });
});

describe("heightTransition", () => {
  it("should set height auto when finish", () => {
    const element: Partial<HTMLDivElement> = {
      style: ({} as unknown) as CSSStyleDeclaration,
    };
    heightTransition.onAfterEnter(element as HTMLDivElement);
    expect(element.style?.height).toEqual("auto");
  });
});
</script>
