<template>
  <div class="shortDetails">
    <ul class="day-info-container">
      <li class="day-info-wrapper __titles">
        <div class="day __title">
          <span>Day</span>
        </div>
        <div class="rainChance">Rain Chance</div>
        <div class="ico">
          Icon
        </div>
        <div class="temp">Day &deg;C</div>
      </li>

      <li
        class="day-info-wrapper"
        v-for="(day, index) in week"
        :key="weekDayKey(day)"
      >
        <div class="day">
          <span>{{ weekDayName(index) }}</span>
        </div>
        <div class="rainChance">{{ weekDayRainChance(index) }}</div>
        <div class="ico">
          <img :src="weekDayIconUrl(index)" :alt="weekDayIconAlt(index)" />
        </div>
        <div class="temp">{{ weekDayTemp(index) }}&deg;C</div>
      </li>
    </ul>
    <!-- <button @click="log">LOG Response</button> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ShortDetails extends Vue {
  @Prop() week: any; //Here will be one city object - currently selected

  weekDayName(index) {
    const options = {
      weekday: "long",
    };
    const dayName = new Date(this.week[index].dt * 1000).toLocaleDateString(
      "en-US",
      options
    );

    return dayName;
  }

  weekDayKey(day) {
    const dayId = `${day.weather[0].id}-${day.dt}`;
    // console.log(dayId);

    return dayId;
  }

  weekDayTemp(index) {
    const dayTemp = this.week[index].temp.day;

    return dayTemp;
  }

  weekDayRainChance(index) {
    const rainChance = this.week[index].rain;

    return rainChance ? `${rainChance}%` : "-";
  }

  weekNightTemp(index) {
    const nightTemp = this.week[index].temp.night;

    return nightTemp;
  }

  weekDayIconUrl(index) {
    const iconCode = this.week[index].weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;

    return iconURL;
  }

  weekDayIconAlt(index) {
    const iconAlt = this.week[index].weather[0].description;

    return iconAlt;
  }

  log() {
    const response = this.week;

    console.log(response);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin columnCell() {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
@mixin rowCell() {
  padding: 10px 0;
}

.shortDetails {
  grid-area: shortDetails;
  height: 100%;
  overflow: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  .day-info-container {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    min-height: 100%;

    .day-info-wrapper {
      display: flex;
      flex-direction: row;
      margin: 2px 0;
      height: 50px;

      .day,
      .rainChance,
      .ico,
      .temp {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25%;
      }
      .day {
        padding: 10px;
        border-radius: 10px;
        background-color: hsla(237, 60%, 26%, 1);
        color: #fff;
      }
      .__title {
        background-color: transparent;
        color: #0f113d;
      }

      .ico {
        img {
          background-color: hsla(237, 60%, 26%, 1);
          border-radius: 10px;
        }
      }
    }

    .__titles {
      border-bottom: 1px solid #0f113d;
      margin-bottom: 10px;
    }
  }

  // .details {
  //   font-size: 1.2rem;
  //   height: 100%;
  //   display: grid;
  //   grid-template-columns: 2fr 1fr 1fr 1fr;
  //   // grid-template-rows: 1fr;
  //   grid-template-areas: "days rainCh wIcons temp";

  //   .days {
  //     grid-area: days;

  //     @include columnCell();

  //     .day {
  //       @include rowCell();
  //     }
  //   }

  //   .raining-chance {
  //     grid-area: rainCh;
  //     @include columnCell();
  //     .rChance {
  //       @include rowCell();
  //     }
  //   }

  //   .weather-icons {
  //     grid-area: wIcons;
  //     @include columnCell();
  //     .weatcherIcon {
  //       // @include rowCell();
  //       display: flex;
  //       flex-direction: column;
  //       justify-content: center;
  //       align-items: center;

  //       margin: 1px 0;
  //       background-color: rgb(80, 15, 124);
  //       img {
  //         max-height: 2rem;
  //       }
  //     }
  //   }

  //   .temperatures {
  //     grid-area: temp;
  //     @include columnCell();
  //     .temperature {
  //       @include rowCell();
  //     }
  //   }
  // }
}
</style>
