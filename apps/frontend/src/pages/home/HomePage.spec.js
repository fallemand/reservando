import { shallowMount } from "@vue/test-utils";
import HomePage from "@/pages/home/HomePage.vue";
jest.mock("./service");

describe("HomePage", () => {
  it("should render with modules", () => {
    const wrapper = shallowMount(HomePage, {
      global: {
        mocks: {
          $store: {
            dispatch: jest.fn(),
          },
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
