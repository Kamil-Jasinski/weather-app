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
@import "@/styles/vue-select.scss";
@import "@/styles/vue-carousel.scss";

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


// V-SELECT input

</style>
