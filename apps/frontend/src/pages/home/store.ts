import Vuex, { ActionTree, GetterTree, ModuleTree, MutationTree, Store } from "vuex";
import Vue from "vue";
import supplier, { SupplierStatusState } from "@Modules/supplier/store";
import { HomeState } from "./types";

Vue.use(Vuex);

export const modules: ModuleTree<SupplierStatusState> = {
  supplier,
};
export const state: HomeState = {
  isLoading: false,
};

export const getters: GetterTree<HomeState, HomeState> = {};

export const actions: ActionTree<HomeState, HomeState> = {
  async loadDefaultState(context): Promise<void> {
    //eslint-disable-next-line
    console.log(context.state);
  },
};

export const mutations: MutationTree<HomeState> = {};

const store: Store<HomeState> = new Vuex.Store({
  modules: {
    supplier,
  },
  state,
  actions,
  getters,
  mutations,
});

export default store;
