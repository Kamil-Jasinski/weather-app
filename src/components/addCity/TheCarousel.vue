<template>
  <div
    v-if="savedForecasts.length > 0"
    :class="`carousel-wrapper ${carouselClass}`"
  >
    <h2 class="forecast-title">
      Saved Forecast:
    </h2>

    <carousel
      style="width: 100%"
      v-if="savedForecasts.length > 0 && !testflag"
      :paginationEnabled="false"
      :centerMode="true"
      :perPage="count"
      :loop="true"
      :navigationEnabled="true"
      navigationNextLabel="<button class='carousel-nav-button'>></button>"
      navigationPrevLabel="<button class='carousel-nav-button'><</button>"
    >
      <slide v-for="(city, index) in savedForecasts" :key="city.id">
        <div
          :class="
            `city-card ${shouldScaleCard(city.name) ? ' scaled-card' : ''}`
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
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Carousel, Slide } from "vue-carousel";

@Component({
  components: {
    Carousel,
    Slide,
  },
})
export default class TheCarousel extends Vue {
  @Prop() shouldScaleCard: any;
  @Prop() currentlySelectedCity: any;
  @Prop() savedForecasts: any;
  @Prop() carouselClass!: string;
  @Prop() getCityForecast!: () => void;

  testflag = false;
  count = 3;

  @Watch("carouselClass")
  test(): void {
    this.testflag = true;

    if (this.carouselClass === "small") {
      this.count = 2;
    } else if (this.carouselClass === "") {
      this.count = 3;
    }

    this.$nextTick(() => {
      this.testflag = false;
    });
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

  created(): void {
    // If array exist
    let citys = [];
    if (localStorage.citys !== null) {
      // GET array
      citys = JSON.parse(localStorage.getItem("citys") || "[]");
    }

    this.$store.commit("INIT_SAVED_FORECAST", { forecastArray: citys });
  }

  // test(): void {
  //   this.testflag = true;
  //   this.count = 2;
  //   this.$nextTick(() => {
  //     this.testflag = false;
  //   });
  // }
}
</script>
