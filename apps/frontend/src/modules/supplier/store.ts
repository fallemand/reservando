/**
 * This file provides the store module to handle
 * the user status between different vue apps
 * */
/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any */
import { ActionTree, GetterTree, MutationTree, Module } from "vuex";
import { GlobalType } from "@Types/globals";

declare const GLOBAL: GlobalType;

export interface SupplierStatusState {
  isLoggedIn: boolean;
  isStaff: boolean;
  privileges: string[];
  supplierId: number;
  isOnline: boolean;
  isManaged: boolean;
  isOutbound: boolean;
  isConfirmed: boolean;
  priority: number;
  supplierName: string;
  canAddProducts: boolean;
  hiddenInformationBoxes: { [key: string]: string[] };
  hasCompanyRegistration?: boolean;
  hasBusinessInsurance?: boolean;
  hasPaymentInfo?: boolean;
  hasCompanyLogo?: boolean;
  containerName: string;
  anonymizedIp: string;
  countryCode: string;
  visitorId: string;
  sessionId: string;
}

const state: SupplierStatusState = {
  isLoggedIn: false,
  isStaff: false,
  privileges: [],
  supplierId: 0,
  isOnline: true,
  isManaged: false,
  isOutbound: false,
  isConfirmed: false,
  priority: null,
  supplierName: "",
  canAddProducts: false,
  hiddenInformationBoxes: {},
  hasCompanyRegistration: false,
  hasBusinessInsurance: true,
  hasPaymentInfo: false,
  hasCompanyLogo: true,
  containerName: "",
  anonymizedIp: "",
  countryCode: null,
  visitorId: "",
  sessionId: "",
};

const getters: GetterTree<SupplierStatusState, any> = {
  isBoxVisible: (state) => (page: string, boxId: string) => {
    if (!Object.keys(state.hiddenInformationBoxes).length) {
      return true;
    }
    return !(
      state.hiddenInformationBoxes[`supplier:${page}`] &&
      state.hiddenInformationBoxes[`supplier:${page}`].includes(boxId)
    );
  },
  hasPrivilege: (state) => (privilege: string) =>
    state.privileges.includes(privilege) || state.isStaff,
};

const actions: ActionTree<SupplierStatusState, any> = {
  setSupplierStatus({ commit }, status) {
    commit("SET_SUPPLIER_STATUS", status);
  },
};

const mutations: MutationTree<SupplierStatusState> = {
  SET_SUPPLIER_STATUS(state, status) {
    Object.assign(state, status);
  },
  SET_HIDDEN_INFORMATION_BOXES(state, hiddenInformationBoxes) {
    state.hiddenInformationBoxes = hiddenInformationBoxes;
  },
};

const module: Module<SupplierStatusState, any> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default module;
