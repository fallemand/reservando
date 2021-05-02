import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore, Store, MutationTree, ActionTree } from "vuex";
import { HomeState, ChangeStatePayload } from "./types";

export const state: HomeState = {
  name: "",
};

export const actions: ActionTree<HomeState, HomeState> = {
  async loadDefaultState(): Promise<void> {},
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
