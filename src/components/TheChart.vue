<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["chartData"],
  data() {
    return {
      datacollection: null,
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

  methods: {
    setData() {
      //Props data
      const initData = this.chartData;
      //Arrays where data gonna be pushed
      let dayTempArray = [];
      let nightTempArray = [];
      let labelsArray = [];

      initData.forEach((el) => {
        //Add single item to dayTempArray - day-temp
        const dayTemp = parseInt(el.temp.day.toFixed(0));
        dayTempArray.push(dayTemp);

        //Add single item to dayTempArray - day-temp
        const nightTemp = parseInt(el.temp.night.toFixed(0));
        nightTempArray.push(nightTemp);

        //Add single item (label) to labelsArray
        const label = el.dt;
        const options = {
          weekday: "long",
          day: "numeric",
        };
        const dayName = new Date(label * 1000).toLocaleDateString(
          "en-US",
          options
        );
        labelsArray.push(dayName);
      });

      this.setDataCollection(dayTempArray, nightTempArray, labelsArray);
    },

    setDataCollection(dayTempArray, nightTempArray, labelsArray) {
      this.datacollection = {
        //Data to be represented on x-axis
        labels: labelsArray,
        datasets: [
          {
            barPercentage: 0.4,
            label: "Day Temperature",
            backgroundColor: "#eb4d4b",
            borderWidth: 2,
            borderColor: "#ff7979",
            color: "#FFF",
            //Data to be represented on y-axis
            data: dayTempArray,
          },
          {
            barPercentage: 0.4,
            label: `Night Temperature`,
            backgroundColor: "#4834d4",
            borderWidth: 2,
            borderColor: "#686de0",
            color: "#FFF",
            //Data to be represented on y-axis
            data: nightTempArray,
          },
        ],
      };
    },
  },

  created() {
    this.setData();
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
