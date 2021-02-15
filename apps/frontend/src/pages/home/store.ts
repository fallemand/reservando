import { createStore } from "vuex";
import { HomeState } from "./types";

export const modules = {};

export const state: HomeState = {
  isLoading: false,
};

export const getters = {};

export const actions = {
  async loadDefaultState(): Promise<void> {},
};

export const mutations = {};

export default createStore({
  modules,
  state,
  actions,
  getters,
  mutations,
});
