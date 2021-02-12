import Vuex, { Store } from "vuex";
import Vue from "vue";
import supplier from "@Modules/supplier/store";
import { RootState } from "@Types/globals";

Vue.use(Vuex);

const store: Store<RootState> = new Vuex.Store({
  modules: {
    supplier,
  },
});

export default store;
