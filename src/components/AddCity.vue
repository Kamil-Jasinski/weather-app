<template>
  <div class="addCity">
    <div class="forecast-wrapper">
      <form class="add-city-form">
        <h3>Search for your city:</h3>
        <v-select :options="cityNames" v-model="selectedCity"></v-select>
      </form>
      <!-- <button @click="log">show saved</button> -->

      <!-- If there is searched card -->
      <div v-if="selectedCity" class="__to-save">
        <h2 class="forecast-title">Searched Place:</h2>
        <div class="searched">
          <div class="city-card">
            <img src="https://picsum.photos/150/200?random=9.webp" alt="" />
            <p>{{ selectedCity }}</p>
            <div class="actions">
              <button
                @click="saveCity"
                name="Add to favourite"
                role="Add to favourite"
              >
                <font-awesome-icon
                  name="Add to favourite icon"
                  class="__heart ico"
                  icon="heart"
                />
              </button>

              <button
                @click.prevent="getCityForecast(selectedCity)"
                name="Check forecast"
                role="Check forecast"
              >
                <font-awesome-icon
                  name="Check forecast icon"
                  class="__check ico"
                  icon="cloud-download-alt"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cards">
        <h2 class="forecast-title">Saved Forecast</h2>
        <carousel
          :paginationEnabled="false"
          paginationColor="#8186EA"
          paginationActiveColor="#0f113d"
          paginationPosition="top"
          :paginationPadding="5"
          :centerMode="true"
          :perPage="2"
          :loop="true"
          :navigationEnabled="true"
          navigationNextLabel="<button class='carousel-nav-button'>></button>"
          navigationPrevLabel="<button class='carousel-nav-button'><</button>"
        >
          <slide v-for="(city, index) in savedForecasts" :key="city.id">
            <div class="city-card">
              <img
                :src="'https://picsum.photos/150/200?random=' + index"
                alt="city pictrue"
              />
              <p>{{ city.name }}</p>
              <div class="actions">
                <button @click="removeFromFav(city.id)">
                  <font-awesome-icon class="__heart ico" icon="heart-broken" />
                </button>

                <button @click.prevent="getCityForecast(city.name)">
                  <font-awesome-icon
                    class="__check ico"
                    icon="cloud-download-alt"
                  />
                </button>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Carousel, Slide } from "vue-carousel";

import cityJson from "@/assets/json/city.list.json";

@Component({
  components: {
    Carousel,
    Slide,
  },
})
export default class AddCity extends Vue {
  selectedCity = "";
  timer = undefined as any;

  saveCity(): void {
    //Get coords/id by city name
    const searchedCity: any = cityJson.find(
      (el) => el.name === this.selectedCity
    );
    const id: number = searchedCity.id;
    const lon: number = searchedCity.coord.lon;
    const lat: number = searchedCity.coord.lat;
    // City details to save
    const objToSave = {
      name: this.selectedCity,
      id: id,
      lon: lon,
      lat: lat,
    };

    // If there is no array o citys - create one
    if (localStorage.citys === undefined) {
      console.log("No array - create one");
      localStorage.setItem("citys", [] as any);
    }
    // If array exists add city to this array
    if (localStorage.citys !== null) {
      // GET array
      let citys = JSON.parse(localStorage.getItem("citys") || "[]");
      // Is obj in array?
      let isObjAlreadyInArray = citys.find(
        (city: any) => city.id === objToSave.id
      );

      if (isObjAlreadyInArray === undefined) {
        // ADD city to array
        citys.push(objToSave);
        this.selectedCity = "";
        // Save array to localStorage
        localStorage.setItem("citys", JSON.stringify(citys));
        // Save item to state array
        this.$store.commit("SAVE_FORECAST", { forecast: objToSave });
      } else {
        console.log("The city is already saved.");
      }
    }
  }

  removeFromFav(id: number) {
    // If array exists remove city array
    if (localStorage.citys !== null) {
      // GET array
      let citys = JSON.parse(localStorage.getItem("citys") || "[]");
      // Is obj in array?
      let newArray = citys.filter((city: any) => city.id != id);

      // UPDATE state&localStorage array
      this.$store.commit("UPDATE_SAVED_FORECAST", { updatedArray: newArray });
      localStorage.setItem("citys", JSON.stringify(newArray));
    } //if-end
  }

  get savedForecasts(): void {
    let citys = this.$store.getters.savedForecast;
    return citys;
  }

  get cityNames() {
    let cityNamesArr: Array<string> = [];

    //Get names from json
    cityJson.forEach((el) => {
      const cityName = el.name;
      cityNamesArr.push(cityName);
    });

    return cityNamesArr;
  }

  getCityForecast(selectedCityName: any) {
    let cityname = selectedCityName;
    window.clearTimeout(this.timer);

    // Get coords/id by city name
    const searchedCity: any = cityJson.find((el) => el.name === cityname);
    const id: number = searchedCity.id;
    const lon: number = searchedCity.coord.lon;
    const lat: number = searchedCity.coord.lat;

    this.$store.dispatch({
      type: "getData",
      id: id,
      cityName: cityname,
      lat: lat,
      lon: lon,
    });

    this.selectedCity = "";

    // UPDATE forecast after 60sec
    this.timer = setTimeout(() => {
      console.log("Updating Forecast for: ", cityname);
      this.getCityForecast(cityname);
    }, 60000);
  }

  created() {
    // If array exist
    let citys = [];
    if (localStorage.citys !== null) {
      // GET array
      citys = JSON.parse(localStorage.getItem("citys") || "[]");
    }

    this.$store.commit("INIT_SAVED_FORECAST", { forecastArray: citys });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main-app-color: #0f113d;
$main-app-color-hover: #1a1e69;

@mixin city-card($actionBgColor) {
  padding: 20px;
  border-radius: 25px;
  position: relative;
  &:hover {
    cursor: default;
    .actions {
      display: flex;
    }
  }
  img {
    max-height: 150px;
    max-width: 200px;

    border-radius: 25px;
  }

  .actions {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;

    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: $actionBgColor;
    button {
      background-color: transparent;
      padding: 10px;
      outline: none;
      border: none;
      cursor: pointer;

      .ico {
        font-size: 2rem;
      }
      .__heart {
        color: #ff7979;
        &:hover {
          color: #eb4d4b;
        }
      }
      .__check {
        color: #badc58;
        &:hover {
          color: #6ab04c;
        }
      }
    }
  }

  p {
    margin-top: 10px;
    color: #fff;
  }
}

.addCity {
  grid-row: 1/8;
  grid-column: 1/6;
  color: $main-app-color;
  height: auto;

  display: flex;
  flex-direction: column;
  height: 100%;

  .forecast-wrapper {
    flex: 1;
    width: 100%;
    max-height: 100%;

    display: flex;
    flex-direction: column;

    // FORM
    .add-city-form {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid $main-app-color;
      padding: 10px 0;
      margin-bottom: 10px;

      button {
        padding: 15px;
        border-radius: 25px;
        border: 1px solid $main-app-color;
        outline: none;
      }
      button {
        background-color: $main-app-color;
        color: #fff;
      }
      button:hover {
        background-color: $main-app-color-hover;
        cursor: pointer;
      }
    }
    // City cards to save
    .__to-save {
      flex-grow: 1;
      flex-basis: 0;
      width: 50%;
      align-self: center;

      display: flex;
      flex-direction: column;
      background-color: #0f113d;
      color: #fff;
      padding: 20px;
      border-radius: 25px;

      .forecast-title {
        display: flex;
        justify-content: center;
        align-items: center;

        margin-bottom: 20px;
      }
      //Currently searched - wrapper for card
      .searched {
        align-self: center;
        display: inline-block;
        .city-card {
          @include city-card(hsla(237, 61%, 15%, 0.5));

          background-color: #686de0;
          background: rgb(15, 17, 61);
          background: linear-gradient(
            0deg,
            rgba(15, 17, 61, 1) 0%,
            rgba(104, 109, 224, 1) 100%
          );
          color: $main-app-color;
          font-weight: bold;
        }
      }
    }

    // Saved City cards
    .cards {
      flex-grow: 3;
      flex-basis: 0;
      justify-content: center;

      display: flex;
      flex-direction: column;

      .forecast-title {
        padding: 10px;
      }

      //Added to fav
      .city-card {
        @include city-card(hsla(237, 61%, 15%, 0.5));
        background-color: $main-app-color;
        color: #fff;
        margin: 0 5px;
      }
    }
  }
}
</style>
