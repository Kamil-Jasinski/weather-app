<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/CityDetails">City Details</router-link>
    </div>
    <router-view />
  </div>
</template>

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
  background-color: #30336b;
  color: rgba(15, 17, 61, 1);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

#nav {
  padding: 30px;
  display: none;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

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
