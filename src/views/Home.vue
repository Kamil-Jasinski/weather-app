<template>
  <div class="home">
    <AddCity />
    <ShortDetails />
    <Widget :city="response" />
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
  response = {
    message: "accurate",
    cod: "200",
    count: 1,
    list: [
      {
        id: 2643743,
        name: "London",
        coord: {
          lat: 51.5085,
          lon: -0.1257,
        },
        main: {
          temp: 11.39,
          feels_like: 5.64,
          temp_min: 10.56,
          temp_max: 12.22,
          pressure: 1020,
          humidity: 66,
        },
        dt: 1616666980,
        wind: {
          speed: 6.69,
          deg: 240,
        },
        sys: {
          country: "GB",
        },
        rain: null,
        snow: null,
        clouds: {
          all: 40,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "rozproszone chmury",
            icon: "03d",
          },
        ],
      },
    ],
  };

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
