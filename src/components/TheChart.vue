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
      let datasetsArray = [];
      let labelsArray = [];

      initData.forEach((el) => {
        //Add single item to datasetsArray
        const temp = parseInt(el.temp.day.toFixed(0));
        datasetsArray.push(temp);

        //Add single item (label) to labelsArray
        // const options = { weekday: "long" };
        // const dayName = new Date(this.week[index].dt * 1000).toLocaleDateString(
        //   "en-US",
        //   options
        // );
      });

      this.setDataCollection(datasetsArray);
    },

    setDataCollection(datasets) {
      this.datacollection = {
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
            data: datasets,
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
    // console.log(typeof this.dataValues);
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
