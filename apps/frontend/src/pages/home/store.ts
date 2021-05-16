import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore, Store, MutationTree, ActionTree } from "vuex";
import { HomeState, ChangeStatePayload } from "./types";
import HomeService from "./service";

const homeService = new HomeService();

export const state: HomeState = {
  name: "",
  shops: [],
};

export const actions: ActionTree<HomeState, HomeState> = {
  async loadDefaultState({ commit }): Promise<void> {
    const shops = await homeService.listShops();
    commit("changeState", { property: "shops", value: shops });
  },
  setName({ commit }, name: string): void {
    commit("changeState", { property: "name", value: name });
  },
};

export const mutations: MutationTree<HomeState> = {
  changeState(state, payload: ChangeStatePayload) {
    const { property, value } = payload;
    state[property] = value;
  },
};

export const store = createStore<HomeState>({
  state,
  actions,
  mutations,
});

// Defining our typed `useStore`
export const key: InjectionKey<Store<HomeState>> = Symbol();
export function useStore(): Store<HomeState> {
  return baseUseStore(key);
}
