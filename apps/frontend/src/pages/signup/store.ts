import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore, Store, MutationTree, ActionTree } from "vuex";
import { SignupState, ChangeStatePayload, Calendar, Sector } from "./types";

export const state: SignupState = {
  name: "",
  calendars: [],
  sectors: {
    inside: {
      id: "inside",
      enabled: false,
      for2: 0,
      for4: 0,
      for6: 0,
      for8: 0,
    },
    outside: {
      id: "outside",
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
    commit("changeState", { property: "name", value: name });
  },
  addCalendar({ state, commit }, calendar: Calendar): void {
    const calendars = state.calendars;
    const editIndex = calendars.findIndex((cal) => calendar.id === cal.id);
    if (editIndex > -1) {
      calendars.splice(editIndex, 1, calendar);
    } else {
      calendars.push(calendar);
    }
    commit("changeState", { property: "calendars", value: calendars });
  },
  deleteCalendar({ state, commit }, calendar: Calendar): void {
    const calendars = state.calendars;
    const deleteIndex = calendars.findIndex((cal) => calendar.id === cal.id);
    if (deleteIndex > -1) {
      calendars.splice(deleteIndex, 1);
      commit("changeState", { property: "calendars", value: calendars });
    }
  },
  updateSector({ state, commit }, sector: Sector): void {
    state.sectors[sector.id] = sector;
    commit("changeState", { property: "sectors", value: state.sectors });
  },
  setNotifications({ commit }, notifications: SignupState["notifications"]): void {
    commit("changeState", notifications);
  },
};

export const mutations: MutationTree<SignupState> = {
  changeState(state, payload: ChangeStatePayload) {
    const { property, value } = payload;
    state[property] = value;
  },
};

export const store = createStore<SignupState>({
  state,
  actions,
  mutations,
});

// Defining our typed `useStore`
export const key: InjectionKey<Store<SignupState>> = Symbol();
export function useStore(): Store<SignupState> {
  return baseUseStore(key);
}
