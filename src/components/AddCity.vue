<template>
  <div class="addCity">
    <div class="forecast-wrapper">
      <!-- <form class="add-city-form">
        <label class="__label">
          <font-awesome-icon class="search-ico" icon="search-location" />
          <v-select
            placeholder="Search for your city"
            :options="cityNames"
            v-model="selectedCityInput"
          ></v-select>
        </label>
      </form> -->
      <SearchBar
        :selectedCityInput="selectedCityInput"
        @change-input="changeInput"
        @clear-input="shouldClearInput"
        :clearInput="clearInput"
      />

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
        <TheCarousel
          :shouldScaleCard="shouldScaleCard"
          :currentlySelectedCity="currentlySelectedCity"
          :savedForecasts="savedForecasts"
          :getCityForecast="getCityForecast"
          :carouselClass="carouselClass"
        />

        <!-- PLACEHOLDER -->
        <Placeholder v-if="savedForecasts.length == 0" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import TheCarousel from "@/components/addCity/TheCarousel.vue";
import Placeholder from "@/components/addCity/Placeholder.vue";
import SearchBar from "@/components/addCity/SearchBar.vue";
import { gsap } from "gsap";
import cityJson from "@/assets/json/city.list.json";

@Component({
  components: {
    TheCarousel,
    Placeholder,
    SearchBar,
  },
})
export default class AddCity extends Vue {
  selectedCityInput = "";
  timer: any;
  searchedCityTL: any = gsap.timeline({ paused: true, reversed: true });
  carouselClass = "";
  clearInput = false;

  mounted(): void {
    this.searchedCityTL.fromTo(
      this.$refs.searchedCity,
      { xPercent: "-100", display: "none", position: "absolute" },
      { xPercent: "0", display: "flex" }
    );
  }

  // Emited function from search bar
  shouldClearInput(clear: boolean): void {
    this.clearInput = clear;
  }
  // Emited function from search bar
  changeInput(inputValue: string): void {
    this.selectedCityInput = inputValue;

    if (inputValue !== "" && inputValue !== null) {
      // console.log("addClass");
      this.carouselClass = "small";
    } else {
      // console.log("remove class");
      this.carouselClass = "";
    }
  }

  @Watch("selectedCityInput", { immediate: false, deep: true })
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
    this.carouselClass = "";
    this.clearInput = true;
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

  saveCity(): void {
    this.clearInput = true;
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

  get savedForecasts(): void {
    let citys = this.$store.getters.savedForecast;
    return citys;
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
} //class
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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

      .small {
        width: 65%;
        margin-left: 34%;
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
        // display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        max-height: 100%;
        width: 33%;
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
