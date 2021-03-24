<template>
  <div class="widget">
    <div class="weather-today">
      <div class="__day">
        <span class="weather-day-icon">
          <font-awesome-icon icon="sun" />
        </span>
        <span class="current-date">
          <span class="__current-day">Today</span>
          <p class="__date">Sun, 3 Aug</p>
        </span>
      </div>

      <div class="__weather-details">
        <div class="__temperature">28&deg;C</div>
        <div class="__location">Berlin, Germany</div>
        <div class="__additional-info">
          <span class="temperature-sensitive">Feels like 28&deg;C</span>
          <div class="__dot-separator"><font-awesome-icon icon="circle" /></div>
          <span class="sunset">Sunset 20:57</span>
        </div>
      </div>
    </div>
    <div class="weatcher-chart">
      <TheChart class="chart-wrapper" />
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import TheChart from "@/components/TheChart.vue";

@Component({
  components: {
    TheChart,
  },
})
export default class Widget extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.widget {
  $main-widget-color: #0f113d;
  $main-widget-color-top: #141750;

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
      }

      .current-date {
        grid-area: todayDetails;
        .__current-day {
          font-size: 1.7rem;
          letter-spacing: 0.1rem;
        }
        .__date {
          font-size: 0.8rem;
          font-weight: 300;
          color: #ffffffbf;
        }
      }
    }

    .__weather-details {
      font-weight: 300;
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

    .chart-wrapper {
      // width: 100% !important;
      // position: relative;
    }
  }
}
</style>
