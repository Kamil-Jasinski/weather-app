<template>
  <div class="widget" :style="`--mainWidgetColor:${mainWidgetColor}`">
    <span class="bg-cloud">
      <img
        class="cl cl2"
        ref="cl2"
        src="@/assets/img/clouds/cloudx2.svg"
        alt=""/>

      <img
        class="cl cl3"
        ref="cl3"
        src="@/assets/img/clouds/cloudx3.svg"
        alt=""/>
      <img class="cl cl1" ref="cl1" src="@/assets/img/clouds/cloud1.svg" alt=""
    /></span>

    <router-link class="widget-link" to="/"
      ><font-awesome-icon class="__user-ico" icon="user"
    /></router-link>

    <div v-if="isDataReady" class="weather-today">
      <div class="__day">
        <span class="weather-day-icon">
          <img
            :src="currentCityWidgetIconUrl"
            :alt="currentCityWidgetIconAlt"
          />
        </span>
        <span class="current-date">
          <span class="__current-day">{{ currentCityDay }}</span>
          <p class="__date">{{ currentCityDate }}</p>
        </span>
      </div>

      <div class="__weather-details">
        <div class="__temperature">{{ currentTemp }}&deg;C</div>
        <div class="__location">
          {{ currentlySelectedCityName }} - {{ cityLocation }}
        </div>
        <div class="__additional-info">
          <span class="temperature-sensitive"
            >Feels like {{ feelsLikeTemp }} &deg;C</span
          >
          <div class="__dot-separator"><font-awesome-icon icon="circle" /></div>
          <span class="short-info"> Sunset {{ sunsetTime }}</span>
        </div>
      </div>
    </div>

    <div v-if="isDataReady" class="weatcher-chart">
      <TheChart :chartData="chartWeeklyData" class="chart-wrapper" />
    </div>

    <div v-if="!isDataReady" class="__placeholder">
      <h2 class="__notify">
        We need some data from you, search for a city to see a forecast!
      </h2>
      <!-- <img src="@/assets/img/undraw_Weather_app_re_kcb1.svg" alt="" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import TheChart from "@/components/TheChart.vue";
import { gsap } from "gsap";

@Component({
  components: {
    TheChart,
  },
})
export default class Widget extends Vue {
  @Prop() weeklyData: any; //Here will be whole week response for city needed to chart
  @Prop() isDataReady: any; //Check is data is ready to show
  @Prop() cityTimeZone: any; //Here will be one timezone eg. Europe/London - currently selected
  @Prop() currCity: any; //Here will be ONE/CURRENT/TODAY city object - currently selected
  mainWidgetColor = "#0f113d";

  get currentlySelectedCityName(): string {
    return this.$store.getters.currentlySelectedCity;
  }

  get chartWeeklyData(): any[] {
    const week = this.weeklyData;
    return week;
  }

  get currentCity(): any {
    return this.currCity;
  }

  get cityLocation(): string {
    return this.cityTimeZone;
  }

  get currentTemp(): number {
    return this.currentCity.temp.toFixed(0);
  }

  get feelsLikeTemp(): number {
    return this.currentCity.feels_like.toFixed(0);
  }

  get currentCityWidgetIconUrl(): string {
    const iconCode = this.currentCity.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;

    return iconURL;
  }

  get currentCityWidgetIconAlt(): string {
    const iconAlt = this.currentCity.weather[0].description;

    return iconAlt;
  }

  get sunsetTime(): string {
    const d = new Date(this.currentCity.dt * 1000); // to get the DateTime.
    let hour: any = d.getHours();
    let minute: any = d.getMinutes();

    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }

    const sunsetTime = `${hour} : ${minute}`;

    return sunsetTime;
  }

  get currentCityDate(): string {
    const monthAndDay = new Date(this.currentCity.dt * 1000).toLocaleDateString(
      "en-EN",
      {
        year: "numeric",
        month: "long",
      }
    );
    return monthAndDay;
  }

  get currentCityDay(): string {
    const options: Record<string, unknown> = {
      weekday: "long",
      day: "numeric",
    };
    const today = new Date(this.currentCity.dt * 1000).toLocaleDateString(
      "en-US",
      options
    );

    return today;
  }

  mounted(): void {
    this.animateClouds();
  }

  animateClouds(): void {
    gsap.fromTo(
      this.$refs.cl1,
      { x: "-200" },
      {
        duration: this.rInt(13, 16),
        x: "550px",
        repeat: -1,
        delay: this.rInt(0, 4),
      }
    );
    gsap.fromTo(
      this.$refs.cl2,
      { x: "-200" },
      {
        duration: this.rInt(13, 18),
        x: "550px",
        repeat: -1,
        delay: this.rInt(0, 4),
      }
    );
    gsap.fromTo(
      this.$refs.cl3,
      { x: "-200" },
      {
        duration: this.rInt(15, 21),
        x: "550px",
        repeat: -1,
        delay: this.rInt(0, 4),
      }
    );
  }

  rInt(min: number, max: number): number {
    //GET RANDOM INT
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
} //class
</script>

<style lang="scss" scoped>
$main-widget-color: let(--mainWidgetColor);
$main-widget-color-top: #141750;
$main-app-color: #0f113d;
.widget {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  grid-area: widget;
  grid-column: 6/-1;
  grid-row: 1/-1;
  width: 100%;
  position: relative;

  overflow: hidden;

  background: rgb(15, 17, 61);
  background: linear-gradient(
    0deg,
    $main-widget-color 0%,
    $main-widget-color-top 45%
  );
  color: #fff;

  display: grid;
  grid-template-rows: 3fr 2fr;
  grid-template-areas:
    "wToday"
    "wChart";

  .widget-link {
    position: absolute;
    text-decoration: none;
    color: #cfcfd8;
    padding: 10px;
    right: 40px;
    top: 40px;
    z-index: 6;
    transition: color 0.4s ease-in-out;
    &:hover {
      color: #eb4d4b;
    }
    .__user-ico {
      font-size: 2rem;
    }
  }

  .weather-today {
    grid-area: wToday;
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .__day {
      display: grid;
      padding: 20px;

      grid-template-columns: repeat(2, minmax(min-content, max-content));
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
        "todayIcon todayDetails"
        "todayIcon todayDetails";

      .weather-day-icon {
        grid-area: todayIcon;
        align-self: center;
        justify-self: center;
        padding: 10px;
        img {
          width: 80px;
        }
      }

      .current-date {
        grid-area: todayDetails;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .__current-day {
          font-size: 1.7rem;
          letter-spacing: 0.1rem;
        }
        .__date {
          letter-spacing: 0.05rem;
          font-size: 0.8rem;
          font-weight: 300;
          color: #ffffffbf;
        }
      }
    }

    .__weather-details {
      font-weight: 300;
      letter-spacing: 0.05rem;
      .__temperature {
        font-size: 5rem;
      }
      .__location,
      .__additional-info {
        font-size: 1rem;
        padding: 20px;
        color: #ffffffbf;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .__additional-info {
        color: $main-app-color;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 10px;
        font-weight: bold;
        border-radius: 25px;
      }
      .__dot-separator {
        margin: 0 10px;
        font-size: 0.3rem;
      }
    }
  }

  .weatcher-chart {
    grid-area: wChart;
    position: relative;
    z-index: 5;
    width: 100%;
    margin: auto auto;
  }

  .__placeholder {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .__notify {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 70%;
      align-self: center;
      font-weight: 200;
      font-size: 2.5rem;
      letter-spacing: 0.1rem;
    }
    img {
      position: absolute;
      bottom: 0;
      width: 100%;
      justify-self: flex-end;
    }
  }

  .bg-cloud {
    color: #fff;
    fill: #fff;
    .cl {
      max-width: 180px;
      position: absolute;
      left: 0;
      z-index: 2;
      opacity: 0.05;
      -webkit-filter: invert(100%); /* Safari/Chrome */
      filter: invert(100%);
    }
    .cl1 {
      top: 20px;
    }
    .cl2 {
      top: 40%;
    }
    .cl3 {
      top: 230px;
    }
  }
}
</style>
