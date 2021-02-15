import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import HomePage from "@Pages/home/HomePage.vue";
jest.mock("./service");

const localVue = createLocalVue();
localVue.use(Vuex);

describe("HomePage", () => {
  let storeData;

  beforeEach(() => {
    storeData = {
      state: {},
      actions: {
        loadDefaultState() {
          return Promise.resolve(true);
        },
      },
      getters: {},
    };
  });

  it("should render with modules", () => {
    const wrapper = shallowMount(HomePage, {
      store: new Vuex.Store(storeData),
      localVue,
    });
    expect(cleanSnapshot(wrapper)).toMatchSnapshot();
  });
});
