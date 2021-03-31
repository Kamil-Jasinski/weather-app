import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey: process.env.VUE_APP_API_KEY,
    isDataReady: false,
    currentData: [],
    savedForecast: [],
    isLoggedIn: false,
  },
  mutations: {
    CHANGE_DATA(state, payload) {
      state.currentData = payload.data;
    },
    CHANGE_DATA_READY(state, payload) {
      state.isDataReady = payload.ready;
    },
    SAVE_FORECAST(state, payload) {
      const singleForecast: any = payload.forecast;
      state.savedForecast.unshift(singleForecast);
    },
    INIT_SAVED_FORECAST(state, payload) {
      const arrayForecast = payload.forecastArray;
      state.savedForecast = arrayForecast;
    },
    UPDATE_SAVED_FORECAST(state, payload) {
      const updatedForecast = payload.updatedArray;
      state.savedForecast = updatedForecast;
    },
    CHANGE_IS_LOGGED_IN(state, payload) {
      const isLoggedIn = payload.logged;
      state.isLoggedIn = isLoggedIn;
    },
  },
  actions: {
    async getData({ commit }, { id, cityName, lat, lon }) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${this.state.apiKey}&units=metric`
        );
        commit("CHANGE_DATA", { data: response.data });
        commit("CHANGE_DATA_READY", { ready: true });
      } catch (error) {
        throw new Error(error);
      }
    },
    checkAuth({ commit }) {
      if (firebase.auth().currentUser) {
        commit("CHANGE_IS_LOGGED_IN", { logged: true });
      } else {
        commit("CHANGE_IS_LOGGED_IN", { logged: false });
      }
    },
  },
  modules: {},
  getters: {
    currentData: (state) => {
      return state.currentData;
    },
    isDataReady: (state) => {
      return state.isDataReady;
    },
    savedForecast: (state) => {
      return state.savedForecast;
    },
    isLoggedIn: (state) => {
      return state.isLoggedIn;
    },
  },
});
