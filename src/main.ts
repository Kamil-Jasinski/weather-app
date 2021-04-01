import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vSelect from "vue-select";
import firebase from "firebase";

// @@@@@@@@@ FIREBASE
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// @@@@@@@@@ VUE-SELECT
Vue.component("v-select", vSelect);

// @@@@@@@@@ FONT AWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircle,
  faHeart,
  faCloudDownloadAlt,
  faHeartBroken,
  faChevronRight,
  faChevronLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCircle,
  faHeart,
  faCloudDownloadAlt,
  faHeartBroken,
  faChevronRight,
  faChevronLeft,
  faUser
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
