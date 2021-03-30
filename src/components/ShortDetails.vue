<template>
  <div class="shortDetails">
    <ul v-if="isDataReady" class="day-info-container">
      <li class="day-info-wrapper __titles">
        <div class="day __title">
          <span>Day</span>
        </div>
        <div class="rainChance">Rain Chance</div>
        <div class="ico">
          Clouds
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
          <span class="img-container">
            <img :src="weekDayIconUrl(index)" :alt="weekDayIconAlt(index)" />
            <div class="__description">
              {{ weekDayIconAlt(index) }}
            </div>
          </span>
          <img />
        </div>
        <div class="temp">{{ weekDayTemp(index) }}&deg;C</div>
      </li>
    </ul>
    <div v-if="!isDataReady" class="__placeholder">
      <h3 class="__notify">
        No data to show
      </h3>
      <img src="@/assets/img/undraw_empty_xct9.svg" alt="No data to show" />
    </div>
    <!-- <button @click="log">LOG Response</button> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ShortDetails extends Vue {
  @Prop() weekResponse: any; //Here will be one city object - currently selected
  @Prop() isDataReady: any; // Check if data is ready to work on

  get week(): Array<any> {
    const week = this.weekResponse;
    // const responseRd = week.splice(1, 7);

    return week;
  }
  weekDayName(index: number): string {
    const options: Record<string, unknown> = {
      weekday: "long",
    };
    const dayName = new Date(this.week[index].dt * 1000).toLocaleDateString(
      "en-US",
      options
    );

    return dayName;
  }

  weekDayKey(day: Record<string, any>): string {
    const dayId = `${day.weather[0].id}-${day.dt}`;
    // console.log(dayId);

    return dayId;
  }

  weekDayTemp(index: number): number {
    const dayTemp = this.week[index].temp.day;

    return dayTemp;
  }

  weekDayRainChance(index: number): string {
    const rainChance = this.week[index].rain;

    return rainChance ? `${rainChance}%` : "-";
  }

  weekNightTemp(index: number): Array<number> {
    const nightTemp = this.week[index].temp.night;

    return nightTemp;
  }

  weekDayIconUrl(index: number): string {
    const iconCode = this.week[index].weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;

    return iconURL;
  }

  weekDayIconAlt(index: number): string {
    const iconAlt = this.week[index].weather[0].description;

    return iconAlt;
  }

  // log(): void {
  //   const response = this.week;

  //   console.log(response);
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shortDetails {
  grid-area: shortDetails;
  grid-row: 8/-1;
  grid-column: 1/6;

  height: 100%;
  overflow: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  .day-info-container {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    margin: auto auto;

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
        height: 100%;
      }
      .day {
        padding: 10px;
        border-radius: 10px;
        background-color: #4834d4;
        color: #fff;
      }
      .__title {
        background-color: transparent;
        color: #0f113d;
      }

      .ico {
        height: 100%;
        width: 50%;
        .img-container {
          position: relative;
          &:hover {
            .__description {
              display: flex;
            }
          }
          img {
            background-color: #686de0;
            border-radius: 10px;
            height: 100%;
          }
          .__description {
            position: absolute;
            top: 0;
            right: -10%;

            display: none;
            justify-content: center;
            align-items: center;
            height: 90%;
            padding: 10px;
            background-color: #f2cab9;

            border-radius: 10px 2px;
            color: #686de0;
            transform: translateX(100%);
            white-space: nowrap;
            font-weight: bold;
            // text-transform: uppercase;
          }
        }
      }
    }

    .__titles {
      border-bottom: 1px solid #0f113d;
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 1.2em;
    }
  }

  .__placeholder {
    padding: 20px;
    position: relative;
    height: 100%;
    .__notify {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%, -50%);

      font-size: 2rem;
      letter-spacing: 0.2rem;
      white-space: nowrap;
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
