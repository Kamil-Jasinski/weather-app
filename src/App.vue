<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// import firebase from 'firebase';

@Component
export default class app extends Vue {
  beforeCreate() {
    this.$store.dispatch("checkAuth");
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap");
@import "vue-select/src/scss/vue-select.scss";
@import "./styles/vue-select.scss";

*,
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #7c81e1;
  color: #0f113d;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

// #nav {
//   position: absolute;
//   top: 0;
//   left: 50%;
//   transform: translate(-50%, 0);
//   padding: 10px;
//   display: block;
// }

// #nav a {
//   font-weight: bold;
//   color: #fff;
// }

// #nav a.router-link-exact-active {
//   color: #42b983;
// }

// CAROUSELL NAV BUTTONS
.VueCarousel-navigation-next,
.VueCarousel-navigation-prev {
  padding: 0 !important;
  top: 50% !important;
  transform: translate(0, -50%) !important;
}
.VueCarousel-navigation-next {
  right: 2% !important;
}
.VueCarousel-navigation-prev {
  left: 2% !important;
}
.carousel-nav-button {
  padding: 10px;
  color: rgba(15, 17, 61, 1);
  background-color: rgba(238, 83, 83, 0.388);
  font-size: 1.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #ee5352b5;
  }
}
</style>
