<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            barPercentage: 0.4,
            label: "Raining Chance",
            backgroundColor: "#fcba03",
            borderWidth: 2,
            borderColor: "#ffbb00",
            color: "#FFF",
            //Data to be represented on y-axis
            data: [20, 100, 24, 12, 33, 62, 21],
          },
        ],
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "#ffffff75",
              },
              gridLines: {
                display: true,
                color: "#ffffff25",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "#ffffff75",
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
          labels: {
            fontColor: "#FFF",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.datacollection, this.options);
  },
};
</script>

<style lang="scss">
.weatcher-chart {
  grid-area: wChart;

  .chart-wrapper {
    canvas {
      width: 100% !important;
    }
  }
}
</style>
