<template>
  <div class="widget" :style="`--mainWidgetColor:${mainWidgetColor}`">
    <div class="weather-today">
      <div class="__day">
        <span class="weather-day-icon">
          <img
            :src="currentCityWidgetIconUrl"
            :alt="currentCityWidgetIconAlt"
          />
          <!-- <font-awesome-icon icon="sun" /> -->
        </span>
        <span class="current-date">
          <span class="__current-day">{{ currentCityDay }}</span>
          <p class="__date">{{ currentCityDate }}</p>
        </span>
      </div>

      <div class="__weather-details">
        <div class="__temperature">{{ currentTemp }}&deg;C</div>
        <div class="__location">{{ cityName }}, {{ cityCountry }}</div>
        <div class="__additional-info">
          <span class="temperature-sensitive"
            >Feels like {{ feelsLikeTemp }} &deg;C</span
          >
          <div class="__dot-separator"><font-awesome-icon icon="circle" /></div>
          <span class="short-info">{{ currentCityShortInfo }}</span>
        </div>
      </div>
    </div>
    <!-- <button @click="mainWidgetColor = 'red'">dfhsdf</button> -->
    <!-- <button @click="log">Log</button> -->
    <div class="weatcher-chart">
      <TheChart class="chart-wrapper" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import TheChart from "@/components/TheChart.vue";

@Component({
  components: {
    TheChart,
  },
})
export default class Widget extends Vue {
  @Prop() city: any; //Here will be one city object - currently selected
  mainWidgetColor = "#0f113d";

  get currentCity() {
    return this.city.list[0];
  }

  get cityName() {
    return this.currentCity.name;
  }

  get cityCountry() {
    return this.currentCity.sys.country;
  }

  get currentTemp() {
    return this.currentCity.main.temp.toFixed(0);
  }

  get feelsLikeTemp() {
    return this.currentCity.main.feels_like.toFixed(0);
  }

  get currentCityWidgetIconUrl() {
    const iconCode = this.currentCity.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;

    return iconURL;
  }

  get currentCityWidgetIconAlt() {
    const iconAlt = this.currentCity.weather[0].description;

    return iconAlt;
  }
  get currentCityShortInfo() {
    const description = this.currentCity.weather[0].description;
    const descriptionCapitalized =
      description.charAt(0).toUpperCase() + description.slice(1);

    return descriptionCapitalized;
  }

  get currentCityDate() {
    const unix_timestamp = 1549312452;
    const date = new Date(unix_timestamp * 1000);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];

    const monthAndDay = new Date(`${year}-${month}`).toLocaleDateString(
      "en-EN",
      {
        year: "numeric",
        month: "long",
      }
    );
    return monthAndDay;
  }

  get currentCityDay() {
    const selectFromDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(this.currentCity.dt * 1000); // to get the DateTime.
    const dayNumber = d.getDay();
    const dayName = selectFromDays[dayNumber]; // It will give day index, and based on index we can get day name from the array.

    const currCityDay = `${dayNumber}  ${dayName}`;

    return currCityDay;
  }

  log() {
    const description = this.currentCity.weather[0].description;
    const descriptionCapitalized =
      description.charAt(0).toUpperCase() + description.slice(1);

    console.log(descriptionCapitalized);
  }
} //class
</script>

<style lang="scss" scoped>
.widget {
  $main-widget-color: let(--mainWidgetColor);
  $main-widget-color-top: #141750;
  $main-app-color: #0f113d;

  grid-area: widget;
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

  .weather-today {
    grid-area: wToday;

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

    // display: flex;
    // flex-wrap: wrap;
    // position: relative;
  }
}
</style>
