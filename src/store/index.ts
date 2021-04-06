import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey: process.env.VUE_APP_API_KEY,
    isDataReady: false,
    currentData: [], // Currently shown data (forecast for currently selected city)
    savedForecast: [], // Saved Forecasts
    isLoggedIn: false, // Is user currently logged in
    currentlySelectedCity: "", // Name eg. London
    showLoginAlert: false, // Should show alert in dashboard ?
    loginAlertContent: "", // Text content to alert in dashboard
    loginAlertClass: "", // Class for alert in dashboard (success, error)
    showLoader: false
  },
  mutations: {
    CHANGE_DATA(state, payload) {
      state.currentData = payload.data;
    },
    CHANGE_DATA_READY(state, payload) {
      state.isDataReady = payload.ready;
    },
    SAVE_FORECAST(state, payload) {
      const singleForecast = payload.forecast;
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
    SET_CURR_SEL_CITY(state, payload) {
      //selCity = name for example: Rzeszów or London
      const selCity = payload.selCity;
      state.currentlySelectedCity = selCity;
    },
    SET_LOGIN_ALERT(state, payload) {
      const showAlert = payload.showAlert;
      const alertContent = payload.content;
      const alertClass = payload.class;
      state.showLoginAlert = showAlert;
      state.loginAlertContent = alertContent;
      state.loginAlertClass = alertClass;
    },
    SET_LOADER(state, payload) {
      const showLoader = payload.showLoader;
      
      state.showLoader = showLoader;
    },
  },
  actions: {
    async getData({ commit }, { id, cityName, lat, lon }) {
      commit("SET_LOADER", { showLoader: true });
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${this.state.apiKey}&units=metric`
        );
        commit("CHANGE_DATA", { data: response.data });
        commit("CHANGE_DATA_READY", { ready: true });
        commit("SET_CURR_SEL_CITY", { selCity: cityName });
        commit("SET_LOADER", { showLoader: false });
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
    currentlySelectedCity: (state) => {
      return state.currentlySelectedCity;
    },
    showLoginAlert: (state) => {
      return state.showLoginAlert;
    },
    loginAlertContent: (state) => {
      return state.loginAlertContent;
    },
    loginAlertClass: (state) => {
      return state.loginAlertClass;
    },
    showLoader: (state) => {
      return state.showLoader;
    },
  },
});
