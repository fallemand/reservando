import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import supplier from "@Modules/supplier/store";
import NotFoundPage from "./NotFoundPage";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("NotFoundPage", () => {
  let storeData;

  beforeEach(() => {
    storeData = {
      modules: {
        supplier,
      },
    };
  });

  it("should render", () => {
    const wrapper = shallowMount(NotFoundPage, { store: new Vuex.Store(storeData), localVue });
    expect(cleanSnapshot(wrapper)).toMatchSnapshot();
  });
});
