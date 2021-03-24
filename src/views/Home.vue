<template>
  <div class="home">
    <AddCity />
    <ShortDetails :citys="data" />
    <Widget />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddCity from "@/components/AddCity.vue"; // @ is an alias to /src
import ShortDetails from "@/components/ShortDetails.vue"; // @ is an alias to /src
import Widget from "@/components/Widget.vue"; // @ is an alias to /src
// const axios = require('axios');

@Component({
  components: {
    AddCity,
    ShortDetails,
    Widget,
  },
})
export default class Home extends Vue {
  data = [
    {
      id: 1,
      city: "Rzeszów",
      temp: 2,
    },
    {
      id: 2,
      city: "Lublin",
      temp: 18,
    },
  ];

  get apiKey() {
    return this.$store.state.apiKey;
  }
}
</script>

<style lang="scss">
.home {
  height: 90vh;
  width: 90vw;
  background-color: #fff;
  border-radius: 25px;

  display: grid;
  column-gap: 10px;
  row-gap: 10px;
  padding: 0 0 0 10px;

  grid-template-columns: repeat(8, minmax(max-content, 1fr));
  grid-template-rows: repeat(6, 1fr);
  grid-template-areas:
    "addCity addCity addCity addCity addCity widget widget widget"
    "addCity addCity addCity addCity addCity widget widget widget"
    "addCity addCity addCity addCity addCity widget widget widget"
    "shortDetails shortDetails shortDetails shortDetails shortDetails widget widget widget"
    "shortDetails shortDetails shortDetails shortDetails shortDetails widget widget widget"
    "shortDetails shortDetails shortDetails shortDetails shortDetails widget widget widget";
}
</style>
