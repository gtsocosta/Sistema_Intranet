<script>
import { Bar } from "vue-chartjs";
export default {
  name: "LineChart",
  extends: Bar,
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    chartColors: {
      type: Object,
    },
  },
  mounted() {
    const dates = this.chartData.map((d) => d.date).sort();
    const nesting = this.chartData.map((d) => d.nesting);
    const homag = this.chartData.map((d) => d.homag);
    const metros = this.chartData.map((d) => d.metros);

    const {
      borderColorMetros,
      pointBorderColorMetros,
      pointBackgroundColorMetros,
      backgroundColorMetros,

      borderColorNesting,
      pointBorderColorNesting,
      pointBackgroundColorNesting,
      backgroundColorNesting,

      borderColorHomag,
      pointBorderColorHomag,
      pointBackgroundColorHomag,
      backgroundColorHomag,
    } = this.chartColors;

    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: "Produção",
            data: metros,
            borderColor: borderColorMetros,
            pointBorderColor: pointBorderColorMetros,
            pointBackgroundColor: pointBackgroundColorMetros,
            backgroundColor: backgroundColorMetros,
          },
          {
            label: "Nesting",
            data: nesting,
            borderColor: borderColorNesting,
            pointBorderColor: pointBorderColorNesting,
            pointBackgroundColor: pointBackgroundColorNesting,
            backgroundColor: backgroundColorNesting,
          },
          {
            label: "Homag",
            data: homag,
            borderColor: borderColorHomag,
            pointBorderColor: pointBorderColorHomag,
            pointBackgroundColor: pointBackgroundColorHomag,
            backgroundColor: backgroundColorHomag,
          },
        ],
      },
      this.options
    );
  },
};
</script>
