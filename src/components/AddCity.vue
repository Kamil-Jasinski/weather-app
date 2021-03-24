<template>
  <div class="addCity">
    <form class="add-city-form">
      <input
        v-model="searchedPlace"
        placeholder="Search for places"
        type="text"
      />
      <button @click.prevent>SEARCH</button>
    </form>

    <div class="saved-forecast">
      <h2 class="forecast">Weatcher Forecast</h2>

      <div class="cards">
        <carousel
          paginationActiveColor="#0f113d"
          :centerMode="true"
          :perPage="3"
          :loop="true"
        >
          <slide>
            <div class="city-card">
              <img src="@/assets/placeholder-img-150-200.jpg" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="@/assets/placeholder-img-150-200.jpg" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="@/assets/placeholder-img-150-200.jpg" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="@/assets/placeholder-img-150-200.jpg" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="@/assets/placeholder-img-150-200.jpg" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="@/assets/placeholder-img-150-200.jpg" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="@/assets/placeholder-img-150-200.jpg" alt="" />
              <p>City, Country</p>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Carousel, Slide } from "vue-carousel";

@Component({
  components: {
    Carousel,
    Slide,
  },
})
export default class AddCity extends Vue {
  searchedPlace = "";
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main-app-color: #0f113d;
$main-app-color-hover: #1a1e69;

.addCity {
  grid-area: addCity;
  color: $main-app-color;
  border-bottom: 1px solid $main-app-color;

  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(auto, 1fr);
  grid-template-columns: repeat(auto-fit, 1fr);
  align-content: center;
  justify-items: center;
  grid-template-areas:
    "AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm"
    "AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm"
    "sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast"
    "sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast"
    "sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast"
    "sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast"
    "sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast"
    "sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast";

  .add-city-form {
    grid-area: AddCForm;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    input,
    button {
      padding: 15px;
      border-radius: 25px;
      border: 1px solid $main-app-color;
      outline: none;
    }
    input {
      margin-right: 10px;
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

  .saved-forecast {
    grid-area: sForecast;

    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-areas:
      "forecast-title"
      "cards"
      "cards"
      "cards";
    .forecast {
      grid-area: forecast-title;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cards {
      grid-area: cards;

      overflow: hidden;

      .city-card {
        height: 100%;
        // background-color: #333;
        grid-area: city-card;
        img {
          max-height: 150px;
          max-width: 200px;

          border-radius: 25px;
        }
      }
    }
  }
}
</style>
