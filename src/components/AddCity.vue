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
              <img src="https://picsum.photos/150/200?random=1.webp" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="https://picsum.photos/150/200?random=2.webp" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="https://picsum.photos/150/200?random=3.webp" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="https://picsum.photos/150/200?random=4.webp" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="https://picsum.photos/150/200?random=5.webp" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="https://picsum.photos/150/200?random=6.webp" alt="" />
              <p>City, Country</p>
            </div>
          </slide>

          <slide>
            <div class="city-card">
              <img src="https://picsum.photos/150/200?random=7.webp" alt="" />
              <p>City, Country</p>
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
  grid-template-rows: repeat(8, 1fr);
  align-content: center;
  justify-items: center;

  .add-city-form {
    //self grid positioning
    grid-column: 1/-1;
    grid-row: 1 / 3;

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
    //self grid positioning
    grid-column: 1/-1;
    grid-row: 3 / -1;

    display: grid;
    grid-template-rows: repeat(4, 1fr);

    .forecast {
      //self grid positioning
      grid-column: 1/-1;
      grid-row: 1 / 2;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cards {
      //self grid positioning
      grid-column: 1/-1;
      grid-row: 2 / -1;

      overflow: hidden;

      .city-card {
        background-color: $main-app-color;
        border-radius: 25px;
        color: #fff;
        margin: 0 5px;
        padding: 10px 0;
        position: relative;
        &:hover {
          background-color: $main-app-color-hover;
          cursor: pointer;
        }

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
