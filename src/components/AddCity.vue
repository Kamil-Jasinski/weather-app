<template>
  <div class="addCity">
    <div class="forecast-wrapper">
      <form class="add-city-form">
        <label class="__label">
          <font-awesome-icon class="search-ico" icon="search-location" />
          <v-select
            placeholder="Search for your city"
            :options="cityNames"
            v-model="selectedCity"
          ></v-select>
        </label>
      </form>
      <!-- <button @click="log">show saved</button> -->

      <div class="cards">
        <!-- If there is searched card -->

        <div v-if="selectedCity" class="searched">
          <h2 class="forecast-title">Searched Place:</h2>
          <div class="city-card">
            <span class="__wrapper">
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
            </span>
          </div>
        </div>

        <div class="carousel-wrapper">
          <h2 v-if="savedForecasts.length > 0" class="forecast-title">
            Saved <strong>Forecast</strong>:
          </h2>

          <carousel
            style="width: 90%"
            v-if="savedForecasts.length > 0"
            :paginationEnabled="false"
            :centerMode="false"
            :perPage="carouselSlidesNumber"
            :loop="true"
            :navigationEnabled="true"
            navigationNextLabel="<button class='carousel-nav-button'>></button>"
            navigationPrevLabel="<button class='carousel-nav-button'><</button>"
          >
            <slide v-for="(city, index) in savedForecasts" :key="city.id">
              <div class="city-card">
                <span class="__wrapper">
                  <img
                    :src="'https://picsum.photos/150/200?random=' + index"
                    alt="city pictrue"
                  />
                  <p @click.prevent="getCityForecast(city.name)">
                    {{ city.name }}
                  </p>

                  <div
                    @click.prevent="getCityForecast(city.name)"
                    class="actions"
                  >
                    <button class="__remove" @click="removeFromFav(city.id)">
                      <font-awesome-icon
                        class="__heart-broken ico"
                        icon="heart-broken"
                      />
                    </button>
                  </div>
                </span>
              </div>
            </slide>
          </carousel>
        </div>
        <span v-if="savedForecasts.length == 0" class="__placeholder">
          <img src="@/assets/img/undraw_Add_files_re_v09g.svg" alt="" />
          <p>Save forecasts for your favourites citys</p>
        </span>
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

  currentlySelected(cityName) {
    console.log("cos");
  }

  get carouselSlidesNumber(): number {
    let isSelected = 3;
    if (this.selectedCity === "") {
      isSelected = 3;
    } else {
      isSelected = 2;
    }

    return isSelected;
  }
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

.addCity {
  grid-row: 1/7;
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
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      padding: 45px 0 10px 45px;

      .__label {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        .search-ico {
          font-size: 1.8rem;
          color: #9d9d9d;
          margin-right: 15px;
        }
      }
    }

    // Saved City cards
    .cards {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      width: 100%;
      justify-content: center;
      overflow: hidden;
      .carousel-wrapper {
        display: flex;
        width: 100%;
        align-items: center;
        flex-direction: column;
      }

      .forecast-title {
        padding: 10px;
        white-space: nowrap;
        margin-bottom: 20px;
      }

      .city-card {
        position: relative;
        .__wrapper {
          display: inline-block;
          width: auto;
          position: relative;
          border-left: 1px solid hsla(237, 61%, 15%, 0.3);
          border-bottom: 1px solid hsla(237, 61%, 15%, 0.3);

          &:hover {
            .actions {
              display: block;
            }
          }

          p {
            position: relative;
            z-index: 3;
            padding: 5px;
          }

          .actions {
            position: absolute;
            display: none;
            top: 0;
            z-index: 2;
            width: 100%;
            height: 100%;

            &:hover {
              background-color: hsla(4, 80%, 96%, 0.3);
              cursor: pointer;
            }
            button {
              background-color: rgba(0, 0, 0, 0.3);
              padding: 10px;
              outline: none;
              border: none;
              cursor: pointer;
              position: relative;
              z-index: 3;

              .ico {
                font-size: 2rem;
              }
              .__heart,
              .__heart-broken {
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
            .__remove {
              position: absolute;
              left: 0 !important;
            }
          }
        }
      }

      .__placeholder {
        img {
          width: 200px;
          align-self: center;
        }
      }
    }
  }
}
</style>
