<template>
  <div class="addCity">
    <div class="forecast-wrapper">
      <form class="add-city-form">
        <label class="__label">
          <font-awesome-icon class="search-ico" icon="search-location" />
          <v-select
            placeholder="Search for your city"
            :options="cityNames"
            v-model="selectedCityInput"
          ></v-select>
        </label>
      </form>

      <div class="cards">
        <!-- SEARCHED CARD -->
        <div ref="searchedCity" class="searched">
          <h2 class="forecast-title">Searched Place:</h2>
          <div
            :class="
              `city-card ${
                shouldScaleCard(selectedCityInput) ? ' scaled-card' : ''
              }`
            "
          >
            <span class="__wrapper">
              <img src="https://picsum.photos/150/200?random=9.webp" alt="" />
              <p>
                {{ selectedCityInput ? selectedCityInput : "Search a place" }}
              </p>
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
                  @click="clearSearchedCityInput"
                  name="Close searched city card"
                  role="Close searched city card"
                  class="__close-searched"
                >
                  <font-awesome-icon
                    name="Close searched city icon"
                    class="__close ico"
                    icon="times"
                  />
                </button>
                <div
                  class="__download-data"
                  @click.prevent="getCityForecast(selectedCityInput)"
                >
                  <!-- actions overlay - download data on click -->
                </div>
              </div>
            </span>
          </div>
        </div>

        <!-- SAVED CARDS -->
        <div v-if="savedForecasts.length > 0" class="carousel-wrapper">
          <h2 class="forecast-title">
            Saved Forecast:
          </h2>

          <!-- <div class="glide">
            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                <div
                  v-for="(city, index) in savedForecasts"
                  :key="city.id"
                  :class="
                    `city-card ${
                      shouldScaleCard(city.name) ? ' scaled-card' : ''
                    }`
                  "
                >
                  <span class="__wrapper">
                    <img
                      :src="'https://picsum.photos/150/200?random=' + index"
                      alt="city pictrue"
                    />
                    <p @click.prevent="getCityForecast(city.name)">
                      {{ city.name }}
                    </p>

                    <div class="actions">
                      <div
                        class="__download-data"
                        name="actions overlay to collect data"
                        @click.prevent="getCityForecast(city.name)"
                      ></div>

                      <button name="remove" @click="removeFromFav(city.id)">
                        <font-awesome-icon
                          class="__heart-broken ico"
                          icon="heart-broken"
                        />
                      </button>
                    </div>``
                  </span>
                </div>
              </ul>
            </div>
          </div> -->

          <carousel
            style="width: 100%"
            v-if="savedForecasts.length > 0"
            :paginationEnabled="false"
            :centerMode="true"
            :perPage="3"
            :loop="true"
            :navigationEnabled="true"
            navigationNextLabel="<button class='carousel-nav-button'>></button>"
            navigationPrevLabel="<button class='carousel-nav-button'><</button>"
          >
            <slide v-for="(city, index) in savedForecasts" :key="city.id">
              <div
                :class="
                  `city-card ${
                    shouldScaleCard(city.name) ? ' scaled-card' : ''
                  }`
                "
              >
                <span class="__wrapper">
                  <img
                    :src="'https://picsum.photos/150/200?random=' + index"
                    alt="city pictrue"
                  />
                  <p>
                    {{ city.name }}
                  </p>

                  <div class="actions">
                    <div
                      class="__download-data"
                      name="actions overlay to collect data"
                      @click.prevent="getCityForecast(city.name)"
                    ></div>

                    <button name="remove" @click="removeFromFav(city.id)">
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

        <!-- PLACEHOLDER -->
        <span v-if="savedForecasts.length == 0" class="__placeholder">
          <img src="@/assets/img/undraw_Add_files_re_v09g.svg" alt="" />
          <p>Save forecasts for your favourites citys</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Carousel, Slide } from "vue-carousel";
import { gsap } from "gsap";

import cityJson from "@/assets/json/city.list.json";
import Glide from "@glidejs/glide";

@Component({
  components: {
    Carousel,
    Slide,
  },
})
export default class AddCity extends Vue {
  selectedCityInput = "";
  timer: any;
  glideInstance: any = null;
  searchedCityTL: any = gsap.timeline({ paused: true, reversed: true });

  mounted(): void {
    this.searchedCityTL.fromTo(
      this.$refs.searchedCity,
      { xPercent: "-100" },
      { xPercent: "0" }
    );
  }

  @Watch("selectedCityInput", { immediate: false, deep: false })
  onSelectChange(): void {
    // Trigger animation
    const input = this.selectedCityInput;
    if (input !== null && input !== "") {
      // console.log("play");
      this.searchedCityTL.play();
    } else {
      // console.log('reverse');
      this.searchedCityTL.reverse();
    }
  }

  clearSearchedCityInput(): void {
    this.selectedCityInput = "";
  }

  shouldScaleCard(cardCityName: string): boolean {
    if (cardCityName === this.currentlySelectedCity && cardCityName !== "") {
      return true;
    } else {
      return false;
    }
  }

  get currentlySelectedCity(): string {
    return this.$store.getters.currentlySelectedCity;
  }

  get carouselSlidesNumber(): number {
    let isSelected = 3;
    if (this.selectedCityInput === "") {
      isSelected = 3;
    } else {
      isSelected = 2;
    }

    return isSelected;
  }

  saveCity(): void {
    //Get coords/id by city name
    const searchedCity: any = cityJson.find(
      (el) => el.name === this.selectedCityInput
    );
    const id: number = searchedCity.id;
    const lon: number = searchedCity.coord.lon;
    const lat: number = searchedCity.coord.lat;
    // City details to save
    const objToSave = {
      name: this.selectedCityInput,
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
        this.selectedCityInput = "";
        // Save array to localStorage
        localStorage.setItem("citys", JSON.stringify(citys));
        // Save item to state array
        this.$store.commit("SAVE_FORECAST", { forecast: objToSave });
      } else {
        console.log("The city is already saved.");
        this.selectedCityInput = "";
      }
    }
  }

  removeFromFav(id: number): void {
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

  get cityNames(): string[] {
    let cityNamesArr: Array<string> = [];

    //Get names from json
    cityJson.forEach((el) => {
      const cityName = el.name;
      cityNamesArr.push(cityName);
    });

    return cityNamesArr;
  }

  getCityForecast(selectedCityName: string): void {
    clearTimeout(this.timer);

    let cityname = selectedCityName;

    // Get coords/id by city name
    const searchedCity: any = cityJson.find((el) => el.name === cityname);

    const id: number = searchedCity.id;
    const lon: number = searchedCity.coord.lon;
    const lat: number = searchedCity.coord.lat;

    // Get Data
    this.$store.dispatch({
      type: "getData",
      id: id,
      cityName: cityname,
      lat: lat,
      lon: lon,
    });

    // UPDATE forecast after 60sec if user is logged in
    if (this.$store.getters.isLoggedIn === true) {
      this.timer = setTimeout(() => {
        this.getCityForecast(cityname);
        cityname = "";
      }, 60000);

      this.$store.commit("SET_CURR_SEL_CITY", { selCity: "" });
    } else {
      console.log("NIE SPRAWDZAJ");
    }
  }

  created(): void {
    // If array exist
    let citys = [];
    if (localStorage.citys !== null) {
      // GET array
      citys = JSON.parse(localStorage.getItem("citys") || "[]");
    }

    this.$store.commit("INIT_SAVED_FORECAST", { forecastArray: citys });
  }

  // mounted() {
  //   this.glideInstance = new Glide(".glide", {
  //     type: "slider",
  //     // startAt: 0,
  //     perView: this.carouselSlidesNumber,
  //   }).mount();
  // }

  // @Watch("savedForecasts") watchSavedForecasts() {
  //   console.log(this.glideInstance);
  // if(this.savedForecast)
  //   this.glideInstance.update({

  //   });
  // }

  // @Watch("selectedCityInput") perView() {
  //   if (this.selectedCityInput === "") {
  //     console.log("powinno być2");
  //     this.glideInstance.update({
  //       perView: 2,
  //     });
  //   } else {
  //     console.log("powinno być2");
  //     this.glideInstance.update({
  //       perView: 3,
  //     });
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main-app-color: #0f113d;
$main-app-color-hover: #1a1e69;
// Required Core Stylesheet
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";

// Optional Theme Stylesheet
@import "node_modules/@glidejs/glide/src/assets/sass/glide.theme";

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
    overflow: hidden;

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
        width: max-content;
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
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      width: 100%;
      max-height: min-content;
      .carousel-wrapper {
        display: flex;
        width: 100%;
        align-items: center;
        flex-direction: column;

        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
      }

      .forecast-title {
        padding: 10px;
        white-space: nowrap;
        margin-bottom: 20px;
      }

      .city-card {
        position: relative;
        img {
          position: relative;
          z-index: 1;
          // width: auto;
          // height: 200px;
          max-width: 100%;
          // max-height: 100%;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          object-fit: contain;
        }
        .__wrapper {
          display: inline-block;
          width: auto;
          position: relative;
          border-bottom: 1px solid hsla(237, 61%, 15%, 0.3);
          border-top-left-radius: 10px;
          min-height: 230px;

          &:hover {
            .actions {
              // display: block;
              opacity: 1;
              // visibility: 1;
            }
          }

          p {
            position: relative;
            z-index: 3;
            padding: 5px;
          }

          .actions {
            position: absolute;
            // display: none;
            opacity: 0;
            // visibility: 0;
            top: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            transition: background-color 0.3s ease-in-out,
              opacity 0.3s ease-in-out;

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
              position: absolute;
              left: 0;
              border-top-left-radius: 10px;
              z-index: 4;
              pointer-events: auto;
              .ico {
                font-size: 2rem;
                transition: color 0.3s ease-in-out;
              }
              .__heart,
              .__heart-broken {
                color: #ff7979;
                &:hover {
                  color: #eb4d4b;
                }
              }
            }
            .__close-searched {
              left: auto;
              right: 0 !important;
              border-top-right-radius: 10px;
              border-top-left-radius: 0;
              .__close {
                color: #ff7979;
                &:hover {
                  color: #eb4d4b;
                }
              }
            }

            .__download-data {
              position: absolute;
              width: 100%;
              height: 100%;
            }
            .__btn-check-weatcher {
              left: auto;
              right: 0 !important;
              border-top-right-radius: 10px;
              border-top-left-radius: 0;
            }
          }
        }
      }

      .searched {
        background: #fdeeed;
        border-right: 4px solid $main-app-color;
        padding: 10px 20px 10px 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        max-height: 100%;

        position: absolute;
        // left: -10px;
        z-index: 10;
      }

      .scaled-card {
        img {
          height: 250px;
        }
      }

      .__placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
          margin-bottom: 20px;
          width: 200px;
          align-self: center;
        }
      }
    }
  }
}
</style>
