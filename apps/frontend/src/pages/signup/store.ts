import { InjectionKey } from 'vue'
import { useStore as baseUseStore, createStore, Store, MutationTree, ActionTree } from 'vuex'
import { SignupState, ChangeStatePayload } from "./types";

export const state: SignupState = {
  name: "",
  calendars: [],
  sectors: {
    inside: {
      enabled: false,
      for2: 0,
      for4: 0,
      for6: 0,
      for8: 0,
    },
    outside: {
      enabled: false,
      for2: 0,
      for4: 0,
      for6: 0,
      for8: 0,
    },
  },
  notifications: {
    whatsapp: {
      enabled: false,
      value: "",
    },
    email: {
      enabled: false,
      value: "",
    },
  },
};

export const actions: ActionTree<SignupState, SignupState> = {
  async loadDefaultState(): Promise<void> {},
  setName({ commit }, name: string): void {
    const payload = { property: "name", value: name}
    commit("changeState", payload);
  },
  setCalendars({ commit }, sectors: SignupState["calendars"]): void {
    commit("changeState", sectors);
  },
  setSectors({ commit }, sectors: SignupState["sectors"]): void {
    commit("changeState", sectors);
  },
  setNotifications({ commit }, notifications: SignupState["notifications"]): void {
    commit("changeState", notifications);
  },
};

export const mutations: MutationTree<SignupState> = {
  changeState(state, payload: ChangeStatePayload) {
    const { property, value } = payload;
    state[property] = value;
  }
};

export const store = createStore<SignupState>({
  state,
  actions,
  mutations,
})

// Defining our typed `useStore`
export const key: InjectionKey<Store<SignupState>> = Symbol()
export function useStore () {
  return baseUseStore(key)
}
