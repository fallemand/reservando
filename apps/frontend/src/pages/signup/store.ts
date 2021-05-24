import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore, Store, MutationTree, ActionTree } from "vuex";
import { SignupState, ChangeStatePayload } from "./types";
import { Shops, Time } from "@reservando/commons/types";
import SignupService from "./service";

const signupService = new SignupService();

export const state: SignupState = {
  name: "",
  calendar: {
    openingTimes: [
      {
        from: "18:00",
        to: "00:00",
      },
    ],
    days: [],
  },
  interval: 30,
  duration: 120,
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
  userId: null,
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
  error: null,
};

export const actions: ActionTree<SignupState, SignupState> = {
  async loadDefaultState(): Promise<void> {},
  setName({ commit }, name: string): void {
    commit("changeState", { property: "name", value: name });
  },
  setUser({ commit }, uid: string): void {
    commit("changeState", { property: "userId", value: uid });
  },
  setOpeningDays({ state, commit }, days: Time.DayName[]): void {
    const calendar = state.calendar;
    calendar.days = days;
    commit("changeState", { property: "calendar", value: calendar });
  },
  setOpeningTimes({ state, commit }, openingTimes: Time.OpeningTime[]): void {
    const calendar = state.calendar;
    calendar.openingTimes = openingTimes;
    commit("changeState", { property: "calendar", value: calendar });
  },
  setInterval({ commit }, interval: Time.Interval): void {
    commit("changeState", { property: "interval", value: interval });
  },
  setDuration({ commit }, duration: Time.Duration): void {
    commit("changeState", { property: "duration", value: duration });
  },
  updateSector({ state, commit }, sector: Shops.Sector): void {
    state.sectors[sector.id] = sector;
    commit("changeState", { property: "sectors", value: state.sectors });
  },
  updateNotifications({ commit }, notifications: SignupState["notifications"]): void {
    commit("changeState", notifications);
  },
  createShop({ state, commit }): void {
    try {
      const { name, calendar, sectors, notifications, duration, interval } = state;
      const shop: Shops.Shop = {
        id: "new",
        userId: "new",
        name,
        calendars: [calendar],
        duration,
        interval,
        sectors,
        notifications,
      };
      signupService.create(shop);
    } catch (e) {
      const message = e.response ? e.response.message : e.toString();
      commit("changeState", { property: "error", value: message });
    }
  },
};

export const mutations: MutationTree<SignupState> = {
  changeState(state, payload: ChangeStatePayload) {
    const { property, value } = payload;
    // @ts-ignore: TODO fix error.
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
