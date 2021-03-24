<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
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
            label: "Raining Chance",
            backgroundColor: "#ccba15",
            data: [20, 100, 24, 12, 33, 62, 21],
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>
