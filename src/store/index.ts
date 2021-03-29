import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey: process.env.VUE_APP_API_KEY,
    currentData: "data",
  },
  mutations: {
    CHANGE_DATA(state, payload) {
      state.currentData = payload.data;
    },
  },
  actions: {
    getData({ commit }, { id, cityName, lat, lon }) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=b93f22c5e3a1da701c993e8777e9abe4&units=metric`
        )
        .then((response) => {
          console.log(response.data);

          commit("CHANGE_DATA", { data: "zmiana" });
        });
    },
  },
  modules: {},
  getters: {
    currentData: (state) => {
      return state.currentData;
    },
  },
});
