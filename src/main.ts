import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircle,
  faHeart,
  faCloudDownloadAlt,
  faHeartBroken,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCircle,
  faHeart,
  faCloudDownloadAlt,
  faHeartBroken,
  faChevronRight,
  faChevronLeft
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
