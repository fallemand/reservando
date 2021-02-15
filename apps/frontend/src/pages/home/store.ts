import Vuex, { ActionTree, GetterTree, MutationTree, Store } from "vuex";
import Vue from "vue";
import { HomeState } from "./types";

Vue.use(Vuex);

export const modules = {};
export const state: HomeState = {
  isLoading: false,
};

export const getters: GetterTree<HomeState, HomeState> = {};

export const actions: ActionTree<HomeState, HomeState> = {
  async loadDefaultState(): Promise<void> {},
};

export const mutations: MutationTree<HomeState> = {};

const store: Store<HomeState> = new Vuex.Store({
  modules,
  state,
  actions,
  getters,
  mutations,
});

export default store;
