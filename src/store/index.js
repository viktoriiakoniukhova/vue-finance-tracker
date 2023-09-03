/*eslint-disable*/
import { createStore } from 'vuex'
import auth from "./auth";
import info from "@/store/info";
import category from "@/store/category";
import record from "@/store/record";

export default createStore({
  state: {
    error: null
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchCurrency() {
      const myHeaders = new Headers();
      myHeaders.append("apikey", "lJUynuk5Mo7JfHExMbu133JKWtbOYDhj");

      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };

      const res = await fetch("https://api.apilayer.com/fixer/latest?base=UAH&symbols=UAH,USD,EUR", requestOptions)
      return await res.json();
    }
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
